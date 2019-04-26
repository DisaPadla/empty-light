import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Board from './pages/Dashboard/Dashboard';
import { theme } from './theme';
import GlobalStyle from './globalStyl';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: ${props => props.theme.item};
  background: ${props => props.theme.bg};
  overflow: auto;
`;

export default class App extends React.Component {
  state = { theme: theme.dark };

  onChangeTheme = () => {
    this.setState({
      theme: this.state.theme.bg === theme.light.bg ? theme.dark : theme.light
    });
  };

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <Container>
          <GlobalStyle />
          <Board />
        </Container>
      </ThemeProvider>
    );
  }
}
