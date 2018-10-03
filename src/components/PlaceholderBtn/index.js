import React, { Fragment } from "react";
import styled from "styled-components";

import { Input, Button as ButtonBase } from "../";

const Placeholder = styled.div`
  height: 28px;
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
  margin: ${props => props.theme.margin};
`;

const Button = styled(ButtonBase)`
  margin-top: 10px;
`;

export class PlaceholderBtn extends React.Component {
  state = {
    isPlaceholder: true
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.hideForm, false);
  }

  componentDidUpdate() {
    if (!this.state.isPlaceholder) {
      this.inputRef.focus();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.hideForm, false);
  }

  onToggle = () => {
    this.setState({ isPlaceholder: !this.state.isPlaceholder });
  };

  hideForm = e => {
    if (this.nodeRef && !this.nodeRef.contains(e.target)) {
      this.setState({ isPlaceholder: true });
    }
  };

  submit = () => {
    if (this.props.onAdd) {
      this.props.onAdd(this.inputRef.value);
    }
    this.onToggle();
  };

  render() {
    return (
      <InputWrap innerRef={node => (this.nodeRef = node)}>
        {!this.state.isPlaceholder ? (
          <Fragment>
            <Input
              placeholder={this.props.placeholder}
              innerRef={node => (this.inputRef = node)}
            />
            <Button onClick={this.submit}>Add</Button>
          </Fragment>
        ) : (
          <Placeholder onClick={this.onToggle}>{this.props.text}</Placeholder>
        )}
      </InputWrap>
    );
  }
}
