import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  background-color: ${({ open }) => (open ? 'rgba(0,0,0,0.5)' : 'transparent')};
  height: ${({ open }) => (open ? '100%' : '0')};
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.25s linear 0.15s;
`;

const MiddleModal = styled.div`
  position: relative;
  min-width: 400px;
  min-height: 200px;
  border-radius: 0.3125rem;
  background: ${props => props.theme.bg};
  padding: ${props => props.theme.padding};
  color: ${props => props.theme.color};
  border-radius: ${props => props.theme.radius};
  z-index: 99999;
  animation-duration: ${({ open }) => (open ? '1s' : '0')};
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: ${({ open }) => (open ? 'scale(1.0)' : 'scale(0.0)')};
`;

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onHandleModal);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onHandleModal);
  }

  onHandleModal = e => {
    if (this.modalContent && !this.modalContent.contains(e.target)) {
      this.props.onClose();
    }
  };

  render() {
    console.log(11111, this.props.open);
    return createPortal(
      <MiddleModal
        open={this.props.open}
        ref={node => (this.modalContent = node)}
      >
        {this.props.children}
      </MiddleModal>,
      document.body
    );
  }
}
