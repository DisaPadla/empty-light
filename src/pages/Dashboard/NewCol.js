import React, { PureComponent } from "react";
import styled from "styled-components";

import { Input, Button } from "../../components";

import { addColumn } from "../../firebase/dashboard";

const Placeholder = styled.div`
  height: 80px;
  width: 200px;
  background: ${props => props.theme.secondary};
  color: ${props => props.theme.color};
`;

export class NewCol extends PureComponent {
  state = {
    mode: "placeholder",
    value: ""
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.disableEditMode);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.disableEditMode);
  }

  disableEditMode = ev => {
    if (this.placeholderRef && !this.placeholderRef.contains(ev.target)) {
      this.setState({ mode: "placeholder" });
    }
  };

  addColumn = () => {
    const { columnOrder } = this.state;
    if (this.state.newColumn) {
      const column = {
        name: this.state.newColumn,
        index: columnOrder.length
      };
      addColumn(column);
    }
  };

  onHandleValue = ev => this.setState({ value: ev.target.value });

  enableEditMode = () => this.setState({ mode: "edit" });

  render() {
    if (this.state.mode === "placeholder") {
      return (
        <Placeholder onClick={this.enableEditMode}>
          + Add another column
        </Placeholder>
      );
    }
    return (
      <Placeholder innerRef={node => (this.placeholderRef = node)}>
        <Input
          placeholder="Create section"
          value={this.state.value}
          onChange={this.onHandleValue}
        />
        <Button onClick={this.addColumn}>Create</Button>
      </Placeholder>
    );
  }
}
