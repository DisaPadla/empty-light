import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const modalRoot = document.getElementById("modal-root");

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MiddleModal = styled.div`
  position: absolute;
  min-height: 50%;
  min-width: 50%;
  background: ${props => props.theme.bg};
  border-radius: ${props => props.theme.radius};
  padding: ${props => props.theme.padding};
  color: ${props => props.theme.color};
`;

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.onHandleModal);
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onHandleModal);
    modalRoot.removeChild(this.el);
  }

  onHandleModal = e => {
    if (this.modalContent && !this.modalContent.contains(e.target)) {
      this.props.onClose();
    }
  };

  render() {
    return ReactDOM.createPortal(
      <Wrapper>
        <MiddleModal innerRef={node => (this.modalContent = node)}>
          {this.props.children}
        </MiddleModal>
      </Wrapper>,
      this.el
    );
  }
}
