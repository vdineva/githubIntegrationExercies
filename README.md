This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Once you unzip the folder, run `npm install` inside it
Steps to run the code:
1. Unzip the folder
2. npm install
3. npm run start

The app is running on http://localhost:3000

Currently I've observed the following weird behavior: when the list of users refreshes every 2 minutes,
sometimes the list has quite different data, e.g as of right now the user with most followers is 
"tencent-wechat" with ~1,7K followers. When the data gets refreshed, I sometimes get that the user with most
followers is "JackyAndroid" with 938 followers. As I started to look into why there is such a big discrepancy between the numbers I noticed that sometimes the request to the GitHub API (namely https://api.github.com/search/users?q=created%3A%3E%3D2016-03-05&sort=followers&type=Users) returns   "incomplete_results": true. This behavior is documented here: https://developer.github.com/changes/2014-04-07-understanding-search-results-and-potential-timeouts/
