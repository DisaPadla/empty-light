import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import { Input, Button as ButtonBase } from '../';

const Fade = styled.div`
  &.alert-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  &.alert-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: visibility 0s linear 0.5s, opacity 0.5s linear;
  }
  &.alert-exit {
    opacity: 1;
  }
  &.alert-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: visibility 0s linear 0.4s, opacity 0.4s linear;
  }
`;

const Placeholder = styled.div`
  position: relative;
  height: 28px;
  padding: ${props => props.theme.padding};
  border-radius: ${({ theme }) => `0 0 ${theme.radius} ${theme.radius}`};
  background: ${props => props.theme.primary};
  color: ${props => props.theme.color};
  cursor: pointer;
  &:before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: #1eb97f;
    opacity: 0.4;
    transition: width 0.25s;
    z-index: 0;
  }

  &:hover {
    &:before {
      width: 100%;
    }
  }
`;

const Button = styled(ButtonBase)`
  margin-top: 10px;
`;

const Wrapper = styled(Fade)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: ${props => props.theme.margin};
`;

export const PlaceholderBtn = ({ onAdd, placeholder, text }) => {
  const [isPlaceholder, toggle] = useState(true);
  const nodeRef = useRef(null);
  const inputRef = useRef(null);

  const hideForm = e => {
    if (nodeRef.current && !nodeRef.current.contains(e.target)) {
      toggle(true);
    }
  };

  const submit = () => {
    if (onAdd) {
      onAdd(inputRef.current.value);
    }
    toggle(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', hideForm, false);
    return () => {
      document.removeEventListener('mousedown', hideForm, false);
    };
  }, []);
  return (
    <InputWrap ref={nodeRef}>
      <CSSTransition
        in={!isPlaceholder}
        timeout={300}
        classNames="alert"
        onEnter={() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        {isPlaceholder ? (
          <Placeholder onClick={() => toggle(false)}>{text}</Placeholder>
        ) : (
          <Wrapper>
            <Input placeholder={placeholder} ref={inputRef} />
            <Button onClick={submit}>Add</Button>
          </Wrapper>
        )}
      </CSSTransition>
    </InputWrap>
  );
};
