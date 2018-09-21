import React from "react";
import styled from "styled-components";

import { Input, Button } from "../";

const Placeholder = styled.div`
  height: 28px;
  margin: ${props => props.theme.margin};
  padding: ${props => props.theme.padding};
  border-radius: ${({ theme }) => `0 0 ${theme.radius} ${theme.radius}`};
  background: ${props => props.theme.primary};
  color: ${props => props.theme.color};
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
  margin: ${props => props.theme.margin};
`;

export class PlaceholderBtn extends React.Component {
  state = {
    isPlaceholder: true
  };

  componentDidUpdate() {
    if (!this.state.isPlaceholder) {
      this.inputRef.focus();
    }
  }

  onToggle = () => this.setState({ isPlaceholder: !this.state.isPlaceholder });

  submit = () => {
    if (this.props.onAdd) {
      this.props.onAdd();
    }
  };

  render() {
    if (!this.state.isPlaceholder) {
      return (
        <InputWrap>
          <Input
            placeholder={this.props.placeholder}
            innerRef={node => (this.inputRef = node)}
          />
          <Button onClick={this.onToggle}>Add</Button>
        </InputWrap>
      );
    }

    return <Placeholder onClick={this.onToggle}>{this.props.text}</Placeholder>;
  }
}
