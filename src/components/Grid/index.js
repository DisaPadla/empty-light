import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-auto-columns: 16rem;
  grid-auto-flow: column;
  grid-column-gap: 1rem;
  padding: ${props => props.theme.padding};
`;
