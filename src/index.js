import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import Board from "./pages/Dashboard";
import { Button } from "./components/Button";
import { Container } from "./components/Container";
import { theme } from "./theme";
import "./globalStyl";

class App extends React.Component {
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
          {/* <Button onClick={this.onChangeTheme}>Change theme</Button> */}
          <Board />
        </Container>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
