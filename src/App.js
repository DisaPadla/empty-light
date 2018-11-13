import "@babel/polyfill";
import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Board from "./pages/Dashboard";
import Auth from "./pages/Auth";
import { theme } from "./theme";
import GlobalStyle from "./globalStyl";

import UserProvider from "./UserProvider";
import { PrivateRoute } from "./PrivateRoute";
import Header from "./Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: ${props => props.theme.item};
  background: ${props => props.theme.bg};
`;

const Content = styled.div`
  flex: 2;
  padding: ${props => props.theme.padding};
`;

export default class App extends React.Component {
  state = { theme: theme.dark };

  onChangeTheme = () => {
    this.setState({
      theme: this.state.theme.bg === theme.light.bg ? theme.dark : theme.light
    });
  };

  renderPrivateRoutes() {
    return (
      <React.Fragment>
        <Header />
        <Content>
          <PrivateRoute exact path="/dashboard" component={Board} />
        </Content>
      </React.Fragment>
    );
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <Container>
          <GlobalStyle />
          <UserProvider>
            {() => (
              <Switch>
                <Route exact path="/auth" component={Auth} />
                <Route render={this.renderPrivateRoutes} />
              </Switch>
            )}
          </UserProvider>
        </Container>
      </ThemeProvider>
    );
  }
}
