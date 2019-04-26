import React from 'react';
import styled, { keyframes } from 'styled-components';

const fade = keyframes`
from {
  transform: scale(0.0);
  opacity: 0;
}

to {
  transform: scale(1.0);
  opacity: 1;
}
`;

export const Card = styled.div`
  margin: ${props => props.theme.margin};
  padding: ${props => props.theme.padding};
  min-height: 120px;
  background: ${props => props.theme.primary};
  border-radius: ${props => props.theme.radius};
  border-left: ${props => props.theme.border};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  white-space: normal;
  cursor: pointer;
  color: white;

  &:hover {
    box-shadow: 0 0.875rem 1.75rem rgba(0, 0, 0, 0.25),
      0 0.625rem 0.625rem rgba(0, 0, 0, 0.22);
  }
`;

const PendingLine = styled.div`
  width: 180px;
  height: 20px;
  margin: 6px;
  border-radius: ${props => props.theme.radius};
  background: grey;
`;

const PendingShortLine = styled(PendingLine)`
  width: 120px;
`;

const PendingShortly = styled(PendingLine)`
  width: 80px;
`;

export const PendingCard = ({ innerRef, children, ...rest }) => {
  return (
    <Card ref={innerRef} {...rest}>
      <PendingLine />
      <PendingShortLine />
      <PendingShortly />
      {children}
    </Card>
  );
};
