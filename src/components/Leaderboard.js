import React from "react";
import { connect } from "react-redux";

import { Header, Image, Icon, Label, Menu, Table } from "semantic-ui-react";

function Leaderboard({ users }) {
  return (
    <div className="leaderboard">
      <Table basic="very" celled collapsing padded style={{ marginTop: 50 }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Questions Asked</Table.HeaderCell>
            <Table.HeaderCell>Questions Answered</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Header as="h4" image>
                  <Image src={user.avatarURL} rounded size="mini" />
                  <Header.Content>{user.name}</Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{user.questions}</Table.Cell>
              <Table.Cell>{user.answers}</Table.Cell>
              <Table.Cell>{user.questions + user.answers}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users)
      .map(id => {
        const { name, avatarURL, answers, questions } = users[id];

        return {
          id,
          name,
          avatarURL,
          answers: Object.keys(answers).length,
          questions: Object.keys(questions).length
        };
      })
      .sort((a, b) => b.answers + b.questions > a.answers + a.questions)
  };
}

export default connect(mapStateToProps)(Leaderboard);
