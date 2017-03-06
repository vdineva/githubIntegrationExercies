import React, { Component } from 'react';
import moment from 'moment';
import GitHubAPI from './GitHubAPIHelper';
import GithubRepos from './components/GithubRepos';
import GithubUsers from './components/GithubUsers';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostActiveRepos: [],
      mostActiveUsers: []
    };

    this.refreshRepoData = this.refreshRepoData.bind(this);
    this.refreshUserData = this.refreshUserData.bind(this);
  }

  componentDidMount() {
    this.getMostActiveRepos();
    this.startPolling();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getMostActiveRepos() {
    const oneMonthAgo = moment().subtract(1, 'month').format('YYYY-MM-DD');
    GitHubAPI.getMostActiveRepos(oneMonthAgo).then((repos) => {
      this.setState({
        mostActiveRepos: repos
      });
    }).catch(() => {
      this.setState({
        mostActiveRepos: []
      })
    });
  }

  getMostActiveUsers() {
    const oneYearAgo = moment().subtract(1, 'year').format('YYYY-MM-DD');
    GitHubAPI.getMostActiveUsers(oneYearAgo).then((users) => {
      this.setState({
        mostActiveUsers: users
      });
    }).catch(() => {
      this.setState({
        mostActiveUsers: []
      })
    });
  }

  startPolling() {
    this.getMostActiveUsers(); // do it once and then repeat every 2 minutes
    this.timer = setInterval(this.getMostActiveUsers.bind(this), 2 * 60 * 1000);
  }

  refreshRepoData() {
    this.getMostActiveRepos();
  }

  refreshUserData() {
    this.getMostActiveUsers();
  }

  render() {
    return (
      <div className="App">
        <GithubRepos
          data={this.state.mostActiveRepos}
          onClick={this.refreshRepoData}
          />

        <GithubUsers
          data={this.state.mostActiveUsers}
          onClick={this.refreshUserData}
          />
      </div>
    )
  }
}

export default App;
