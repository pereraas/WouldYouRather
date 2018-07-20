import React, { Component } from "react";
import { connect } from "react-redux";
import { getPercentage } from "../utils/helpers";
import { handleAnswer } from "../actions/questions";
import { Header, Image, Message } from "semantic-ui-react";

class Question extends Component {
  addVote = (id, index) => {
    let answer;
    if (index === 0) {
      answer = "optionOne";
    } else if (index === 1) {
      answer = "optionTwo";
    }
    this.props.dispatch(handleAnswer(id, answer));
  };

  renderQuestion = question => {
    if (!question) {
      return "Cannot find the question";
    }

    const { id, options, selectedOption, totalVotes } = question;
    return (
      <div className="poll-container" style={{ marginTop: 50 }}>
        <h3 style={{ marginBottom: 15 }}>Would you rather</h3>
        <ul>
          {options.map((option, index) => {
            const { optionText, votes } = option;
            return (
              <li
                className={
                  index === selectedOption ? "option chosen" : "option"
                }
                onClick={
                  selectedOption < 0 ? e => this.addVote(id, index) : null
                }
                key={id + index}
              >
                {selectedOption < 0 ? (
                  optionText
                ) : (
                  <div className="result">
                    <span>{optionText} ?</span>
                    <span>
                      {getPercentage(votes, totalVotes)}% ({votes})
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  render() {
    const { question, authedUser, authorAvatarUrl } = this.props;
    if (!question) {
      return (
        <Message>
          <Message.Header>The Question cannot be found</Message.Header>
        </Message>
      );
    }

    return (
      <div>
        <div className="poll-author" style={{ marginTop: 50 }}>
          <Header as="h4">
            By <Image circular src={authorAvatarUrl} />
          </Header>
        </div>
        {this.renderQuestion(question, authedUser)}
      </div>
    );
  }
}

function mapQuestion(question, authedUser) {
  if (!question) {
    return null;
  }
  let selectedOption = question.optionOne.votes.includes(authedUser)
    ? "optionOne"
    : null;
  if (!selectedOption) {
    selectedOption = question.optionTwo.votes.includes(authedUser)
      ? "optionTwo"
      : null;
  }

  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;

  return {
    id: question.id,
    options: [
      {
        optionText: question.optionOne.text,
        votes: optionOneVotes
      },
      {
        optionText: question.optionTwo.text,
        votes: optionTwoVotes
      }
    ],
    selectedOption:
      selectedOption === null ? -1 : selectedOption === "optionOne" ? 0 : 1,
    totalVotes
  };
}

function mapStateToProps({ questions, users, authedUser }, { match }) {
  const qid = match.params.id;
  const question = questions[qid];
  if (!question) {
    return null;
  }
  return {
    question: mapQuestion(question, authedUser),
    authedUser,
    authorAvatarUrl: users[question.author].avatarURL
  };
}

export default connect(mapStateToProps)(Question);
