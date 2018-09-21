import styled from "styled-components";

export const Input = styled.input`
  display: block;
  padding: ${props => props.theme.padding};
  background: ${props => props.theme.primary};
  color: ${props => props.theme.color};
  border: none;
  border-radius: ${props => props.theme.radius};
  outline: none;
  margin: 0;
  transition: margin 85ms ease-in, background 85ms ease-in;

  ::placeholder {
    color: #1eb97f;
  }
`;
