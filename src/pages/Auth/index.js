import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import {
  Button as ButtonBase,
  Input as InputBase,
  ErrorField
} from "../../components";

import { createUser, signIn } from "../../firebase/auth";
import { auth } from "../../firebase";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

const ModeContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Mode = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  background: ${({ isActive, theme }) =>
    isActive ? theme.primary : theme.secondary};
  padding: ${props => props.theme.padding};
  color: ${props => props.theme.color};
  cursor: pointer;
  outline: none;
`;

const Input = styled(InputBase)`
  margin-top: 40px;
`;

const Button = styled(ButtonBase)`
  margin-top: 40px;
`;

export default class Auth extends React.Component {
  state = {
    mode: "create",
    error: ""
  };

  handleError = error => this.setState({ error });

  onToggleMode = mode => this.setState({ mode });

  onHandleSignIn = async () => {
    const email = this.email.value;
    const password = this.password.value;

    const result = await signIn(email, password, this.handleError);
    this.props.history.push("/dashboard");
  };

  onHandleCreateUser = async () => {
    const email = this.email.value;
    const password = this.password.value;

    const result = await createUser(email, password, this.handleError);
    this.props.history.push("/dashboard");
  };

  render() {
    const user = auth.currentUser;
    if (user) {
      return <Redirect from="/auth" to="dashboard" />;
    }

    return (
      <Page>
        <ModeContainer>
          <Mode
            tabIndex={1}
            isActive={this.state.mode === "create"}
            onClick={() => this.onToggleMode("create")}
          >
            Create
          </Mode>
          <Mode
            tabIndex={2}
            isActive={this.state.mode === "signin"}
            onClick={() => this.onToggleMode("signin")}
          >
            Sign In
          </Mode>
        </ModeContainer>
        <Input placeholder="Email..." ref={node => (this.email = node)} />
        <Input
          placeholder="Password..."
          type="password"
          ref={node => (this.password = node)}
        />
        {this.state.mode === "create" && (
          <Input
            placeholder="Confirm password..."
            ref={node => (this.conirmPassword = node)}
          />
        )}
        {this.state.mode === "create" ? (
          <Button onClick={this.onHandleCreateUser}>Create</Button>
        ) : (
          <Button onClick={this.onHandleSignIn}>Sign In</Button>
        )}
        {this.state.error && <ErrorField>{this.state.error}</ErrorField>}
      </Page>
    );
  }
}
