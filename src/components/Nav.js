import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Button } from "semantic-ui-react";
import { handleUserLogout } from "../actions/authedUser";
import { history } from "../utils/history";
import { connect } from "react-redux";

function Nav(props) {
  return (
    <div className="nav-menu">
      <Menu borderless={true} fluid={true} tabular={true}>
        <Menu.Item>
          <NavLink to="/" exact activeClassName="nav-active">
            Home
          </NavLink>
        </Menu.Item>

        <Menu.Item>
          <NavLink to="/add" exact activeClassName="nav-active">
            New Question
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/leaderboard" exact activeClassName="nav-active">
            Leader Board
          </NavLink>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item name="help">
            <div className="poll-author">
              <img src={props.authedUserAvatar} alt="" />
            </div>
          </Menu.Item>
          <Menu.Item name="sign out">
            <Button
              style={{
                color: "white",
                background: "#55acee"
              }}
              onClick={e => {
                console.log("logging out");
                props.dispatch(handleUserLogout());
                history.push("/");
              }}
            >
              Sign Out
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default connect(
  null,
  null,
  null,
  { pure: false }
)(Nav);
