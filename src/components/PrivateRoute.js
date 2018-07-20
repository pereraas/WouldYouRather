import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  authedUser,
  loading,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !authedUser ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        ) : loading ? null : (
          <Component {...props} />
        )
      }
    />
  );
};

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    loading:
      Object.keys(questions).length === 0 || Object.keys(users).length === 0
  };
}

//we dont need with router here
export default connect(mapStateToProps)(PrivateRoute);
