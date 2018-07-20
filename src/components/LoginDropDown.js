import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { getUsers } from "../utils/api";

class LoginDropDown extends Component {
  state = {
    users: null
  };

  componentDidMount() {
    getUsers().then(users => {
      const usersArray = Object.keys(users).map(id => {
        const { name, avatarURL } = users[id];
        return {
          key: name,
          text: name,
          value: id,
          image: {
            avatar: true,
            src: avatarURL
          }
        };
      });
      this.setState(() => ({ users: usersArray }));
    });
  }

  render() {
    return (
      <Dropdown
        placeholder="Select User"
        fluid
        selection
        options={this.state.users}
        onChange={this.props.handleChange}
      />
    );
  }
}

export default LoginDropDown;
