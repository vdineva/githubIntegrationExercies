const axios = require('axios');

var GitHubAPI = {
  getMostActiveRepos: function(created) {
    return axios({
      method: 'get',
      headers: {'Accept': 'application/vnd.github.v3+json'},
      //get repos where created >= created, sorted by stars desc, get only 5
      url: `https://api.github.com/search/repositories?q=created%3A%3E%3D${created}&sort=stars&per_page=5&type=Repositories`
    }).then( response => {
      return response.data.items;
    }).catch( e => {
      console.warn('Unable to fetch GitHub data', e);
      return 'Unable to fetch GitHub data';
    });
  },

  getMostActiveUsers: function(created) {
    return axios({
      method: 'get',
      headers: {'Accept': 'application/vnd.github.v3+json'},
      url: `https://api.github.com/search/users?q=created%3A%3E%3D${created}&sort=followers&per_page=5&type=Users`
    }).then( response => {
      const promises = response.data.items.map((user) => {
        return this.getFollowers(user.login);
      });

      return Promise.all(promises).then((result) => {
        for (let i = 0; i < response.data.items.length; i++) {
          response.data.items[i].followers = result[i];
        }

        return response.data.items;
      });
    }).catch( e => {
      console.warn('Unable to fetch GitHub data', e);
      return 'Unable to fetch GitHub data';
    });
  },

  getFollowers(user) {
    let lastPageUrl;
    return axios({
      method: 'get',
      headers: {'Accept': 'application/vnd.github.v3+json'},
      url: `https://api.github.com/users/${user}/followers`
    }).then( response => {
      let link = response.headers.link;
      //get the url for the last page from the link header
      lastPageUrl = link.split(',')[1].match(/<(.+)>/)[1];

      return axios({
        method: 'get',
        headers: {'Accept': 'application/vnd.github.v3+json'},
        url: lastPageUrl
      });
    }).then((lastPage) => {
      let lastPageNum = lastPageUrl.match(/\?page=(\d+).*$/)[1];

      //number of followers is the number of pages less 1 times 30 per page, plus however many are on the last page
      const numFollowers = (lastPageNum - 1) * 30 + lastPage.data.length;
      return numFollowers;
    }).catch( e => {
      console.warn('Unable to fetch GitHub data', e);
      return 'Unable to fetch GitHub data';
    });
  }
};

module.exports = GitHubAPI;
