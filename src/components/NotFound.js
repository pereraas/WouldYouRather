import React from "react";
import { Segment, Header, Message } from "semantic-ui-react";

const NotFound = () => {
  const square = { width: 175, height: 175 };
  return (
    <Segment inverted textAlign="center">
      <Header as="h1">404</Header>
      If you notice me you must be looking very hard.
    </Segment>
  );
};

export default NotFound;
