import React from "react";
import styled from "styled-components";

import { Button } from "./components";
import { signOut } from "./firebase/auth";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  padding: ${props => props.theme.padding};
  background: ${props => props.theme.secondary};
  border-bottom: 2px solid ${props => props.theme.primary};
  color: ${props => props.theme.color};
`;

export default class Header extends React.Component {
  render() {
    return (
      <Container>
        <Button onClick={signOut}>Log out</Button>
      </Container>
    );
  }
}
