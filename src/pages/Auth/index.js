import React from "react";
import styled from "styled-components";

import { Button, Input } from "../../components";

const Page = styled.div`
  height: 400px;
  width: 500px;
  position: absolute;
  margin: 0;
  background: ${({ theme }) => theme.primary};
`;

export default class Auth extends React.Component {
  render() {
    return <Page />;
  }
}
