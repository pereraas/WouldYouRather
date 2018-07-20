import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import { connect } from "react-redux";
import HomePage from "./HomePage";
import Question from "./Question";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Nav from "./Nav";
import NotFound from "./NotFound";

class App extends Component {
  render() {
    const { authedUser, authedUserAvatar } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {authedUser && <Nav authedUserAvatar={authedUserAvatar} />}
          <div className="container">
            <Switch>
              <Route path="/login" exact component={Login} />
              <PrivateRoute path="/" component={HomePage} exact />
              <PrivateRoute path="/add" component={NewQuestion} exact />
              <PrivateRoute path="/question/:id" component={Question} exact />
              <PrivateRoute path="/leaderboard" component={Leaderboard} exact />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    authedUserAvatar:
      Object.keys(users).length !== 0 ? users[authedUser].avatarURL : ""
  };
}

export default connect(mapStateToProps)(App);
