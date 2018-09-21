import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  padding: 0.25em 1em;
  color: ${props => props.theme.item};
  background: ${props => props.theme.bg};
`;
