import React from "react";
import { withRouter } from "react-router-dom";
import { auth } from "./firebase";

export const UserContext = React.createContext();

class UserProvider extends React.Component {
  state = { user: {}, isFirstLoading: true, loading: false };

  componentDidMount() {
    this.setState({ loading: true });
    this.unsubscribe = auth.onAuthStateChanged(this.authStateChangedCallback);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateUserData = user => this.setState({ user });

  authStateChangedCallback = authData => {
    if (authData) {
      const user = {
        name: authData.displayName,
        email: authData.email,
        photoUrl: authData.photoURL,
        emailVerified: authData.emailVerified,
        uid: authData.uid
      };
      this.updateUserData(user);
    } else {
      // this.setState({ user: {} }, () => this.props.history.push("/auth"));
    }

    if (this.state.isFirstLoading) {
      this.setState({ loading: false, isFirstLoading: false });
    }
  };

  render() {
    return (
      <UserContext.Provider
        value={{ user: this.state.user, updateUserData: this.updateUserData }}
      >
        {this.props.children()}
      </UserContext.Provider>
    );
  }
}

export default withRouter(UserProvider);
