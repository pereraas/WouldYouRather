import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Input, Button, Divider } from "semantic-ui-react";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: ""
  };

  handleOptions = e => {
    const { name, value } = e.target;
    this.setState(() => ({
      [name]: value
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    this.props.dispatch(handleAddQuestion(optionOneText, optionTwoText));
    this.props.history.push("/");
  };

  render() {
    return (
      <form className="add-form" onSubmit={this.handleSubmit}>
        <div style={{ marginTop: 50 }}>
          <h3 style={{ marginBottom: 35 }}>Would You Rather...</h3>
        </div>
        <div style={{ marginBottom: 35 }}>
          <Input
            focus
            fluid
            type="text"
            name="optionOneText"
            placeholder="Option one..."
            value={this.state.optionOneText}
            onChange={this.handleOptions}
          />

          <Divider horizontal>OR</Divider>

          {/* <h4 style={{ marginBottom: 25 }}>OR</h4> */}

          <Input
            focus
            fluid
            type="text"
            name="optionTwoText"
            placeholder="Option two..."
            value={this.state.optionTwoText}
            onChange={this.handleOptions}
          />
        </div>

        <Button
          className="btn"
          disabled={!this.state.optionOneText && !this.state.optionTwoText}
          type="submit"
        >
          Submit
        </Button>
      </form>
    );
  }
}

export default connect()(NewQuestion);
