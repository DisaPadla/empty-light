import React from "react";
import styled from "styled-components";

import { Button, Input, ErrorField } from "../../components";

import { createUser, signIn } from "../../firebase/auth";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  height: 250px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

export default class Auth extends React.Component {
  state = {
    error: ""
  };

  handleError = error => this.setState({ error });

  submit = async () => {
    const email = this.email.value;
    const password = this.password.value;

    const result = await signIn(email, password, this.handleError);
    console.log(111, email, password);
  };

  render() {
    return (
      <Page>
        <Input placeholder="Email..." innerRef={node => (this.email = node)} />
        <Input
          placeholder="Password..."
          type="password"
          innerRef={node => (this.password = node)}
        />
        <Button onClick={this.submit}>Sign In</Button>
        {this.state.error && <ErrorField>{this.state.error}</ErrorField>}
      </Page>
    );
  }
}
