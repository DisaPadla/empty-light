import React from 'react';
import styled from 'styled-components';

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
