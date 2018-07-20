import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Tab, Header } from "semantic-ui-react";
class HomePage extends Component {
  state = {
    showUnAnsweredQuestions: true
  };

  showUnAnsweredQuestions = () => {
    this.setState(() => ({
      showUnAnsweredQuestions: true
    }));
  };

  showAnsweredQuestions = () => {
    this.setState(() => ({
      showUnAnsweredQuestions: false
    }));
  };

  tabChange = (e, d) => {
    const { activeIndex } = d;
    activeIndex === 0
      ? this.showUnAnsweredQuestions()
      : this.showAnsweredQuestions();
  };

  renderTabContent = questionsToBeDisplayed => (
    <ul>
      <li>
        <Header size="medium">Would you rather</Header>
      </li>
      {questionsToBeDisplayed.map(q => (
        <li key={q.id}>
          <Link to={`/question/${q.id}`}>
            {q.optionOne.text} or {q.optionTwo.text} ?
          </Link>
        </li>
      ))}
    </ul>
  );

  render() {
    const { showUnAnsweredQuestions } = this.state;
    const { answeredQustions, unAnsweredQuestions } = this.props;
    const questionsToBeDisplayed = showUnAnsweredQuestions
      ? unAnsweredQuestions
      : answeredQustions;

    const tabPanes = [
      {
        menuItem: "Unanswered Questions",
        render: () => (
          <Tab.Pane active={showUnAnsweredQuestions}>
            {this.renderTabContent(questionsToBeDisplayed)}
          </Tab.Pane>
        )
      },
      {
        menuItem: "Answered Questions",
        render: () => (
          <Tab.Pane active={!showUnAnsweredQuestions}>
            {this.renderTabContent(questionsToBeDisplayed)}
          </Tab.Pane>
        )
      }
    ];

    return (
      <Tab
        panes={tabPanes}
        onTabChange={this.tabChange}
        style={{ marginTop: 70 }}
      />
    );
  }
}

function mapStatetoProps({ questions, users, authedUser }) {
  const answeredQuestionIds = Object.keys(users[authedUser].answers);
  const answeredQustions = answeredQuestionIds
    .map(id => questions[id])
    .sort((q1, q2) => q1.timestamp - q2.timestamp);

  const unAnsweredQuestions = Object.keys(questions)
    .filter(id => !answeredQuestionIds.includes(id))
    .map(id => questions[id])
    .sort((q1, q2) => q1.timestamp - q2.timestamp);

  return {
    answeredQustions,
    unAnsweredQuestions
  };
}
export default connect(mapStatetoProps)(HomePage);
