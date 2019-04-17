import styled from 'styled-components';

export const Input = styled.input`
  display: block;
  padding: ${props => props.theme.padding};
  background: ${props => props.theme.primary};
  color: ${props => props.theme.color};
  border: 2px solid ${props => props.theme.primary};
  border-radius: ${props => props.theme.radius};
  outline: none;
  margin: 0;
  transition: margin 85ms ease-in, background 85ms ease-in;

  :focus {
    border: 2px solid #1eb97f;
  }

  ::placeholder {
    color: #1eb97f;
  }
`;
