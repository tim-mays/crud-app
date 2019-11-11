import React from 'react';
import { Container, Row, Col } from 'reactstrap';

interface ITitleBarProps {
  title: string;
  button?: React.ReactNode;
}

const TitleBar: React.FC<ITitleBarProps> = props => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>{props.title}</h2>
        </Col>
        {props.button ? <Col xs="auto">{props.button}</Col> : null}
      </Row>
    </Container>
  );
};

export default TitleBar;
