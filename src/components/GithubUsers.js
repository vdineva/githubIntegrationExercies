import React, { Component } from 'react';

function displayUserInfo(user) {
  return (
    <div className="table-row" key={user.id}>
      <div className="user-id">{user.id}</div>
      <div className="user-login">{user.login}</div>
      <div className="user-avatar"><img src={user.avatar_url} role="presentation" /></div>
      <div className="user-followers">{user.followers}</div>
    </div>
  )
}

class GithubUsers extends Component {
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
        <h3>Top 5 users on GitHub with the most followers created last year</h3>
        <div className="table-row header">
          <div className="user-id">ID</div>
          <div className="user-login">Login</div>
          <div className="user-avatar">Avatar</div>
          <div className="user-followers">Followers</div>
        </div>

        {!this.props.data.length && <div>'Loading...'</div>}
        {this.props.data.map(displayUserInfo)}

        <button id="prolific_users" onClick={this.handleClick}>Refresh Data</button>
      </div>
    )
  }
}

GithubUsers.PropTypes = {
  data: React.PropTypes.array,
  onClick: React.PropTypes.func
};

export default GithubUsers;
