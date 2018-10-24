import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Board from "./pages/Dashboard";
import Auth from "./pages/Auth";
import { Container } from "./components/Container";
import { theme } from "./theme";
import GlobalStyle from "./globalStyl";

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
        <React.Fragment>
          <GlobalStyle />
          <Container>
            <Router>
              <Switch>
                <Route exact path="/" component={Board} />
                <Route path="/auth" component={Auth} />
              </Switch>
            </Router>
          </Container>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
