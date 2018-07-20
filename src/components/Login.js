import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoginDropDown from "./LoginDropDown";
import { Segment, Header, Image, Button, Icon } from "semantic-ui-react";

class Login extends Component {
  handleChange = (e, d) => {
    this.userId = d.value;
  };

  authenticate = () => {
    this.props.dispatch(handleInitialData(this.userId));
    this.redirectToReferrer = true;
  };
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const square = { width: "100%", margin: "auto" };

    if (this.redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="container">
        <Segment.Group>
          <Segment style={{ background: "#f3f4f5" }}>
            <Header as="h3" textAlign="center">
              <Header.Content>
                Welcome to the Would You Rather App!
                <Header.Subheader>Please sign in to continue</Header.Subheader>
              </Header.Content>
            </Header>
          </Segment>
          <Segment>
            <Image
              src="/img/react-redux-logo.jpeg"
              style={{ width: "50%", margin: "0 auto" }}
            />
          </Segment>
          <Segment textAlign="center">
            <LoginDropDown handleChange={this.handleChange} />
            <Button
              size="large"
              style={{
                color: "white",
                background: "#55acee",
                marginTop: "30px"
              }}
              onClick={this.authenticate}
            >
              Sign In
            </Button>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}
export default connect(mapStateToProps)(Login);
