import styled from "styled-components";

export const Button = styled.button`
  padding: ${props => props.theme.padding};
  border-radius: ${props => props.theme.radius};
  cursor: pointer;
  color: ${props => props.theme.color};
  background: ${props => props.theme.primary};
  border: none;
  outline: none;

  :hover,
  :focus {
    opacity: 0.6;
  }
`;
