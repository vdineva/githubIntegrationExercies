import React, { Component } from 'react';

function displayRepoInfo(repo) {
  return (
    <div className="table-row" key={repo.id}>
      <div className="repo-id">{repo.id}</div>
      <div className="repo-name">{repo.name}</div>
      <div className="repo-description">{repo.description}</div>
      <div className="repo-stars">{repo.stargazers_count}</div>
    </div>
  )
}

class GithubRepos extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <div className="table">
        <h3>Top 5 repositories on GitHub with the most stars created last month</h3>
        <div className="table-row header">
          <div className="repo-id">ID</div>
          <div className="repo-name">Name</div>
          <div className="repo-description">Description</div>
          <div className="repo-stars">Stars</div>
        </div>

        {!this.props.data.length && <div>'Loading...'</div>}
        {this.props.data.map(displayRepoInfo)}

        <button id="hot_repo" onClick={this.handleClick}>Refresh Data</button>
      </div>
    )
  }
}

GithubRepos.PropTypes = {
  data: React.PropTypes.array,
  onClick: React.PropTypes.func
};

export default GithubRepos;
