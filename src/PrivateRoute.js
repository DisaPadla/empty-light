import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserProvider";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <UserContext.Consumer>
      {({ user }) => {
        return (
          <Route
            {...rest}
            render={props =>
              user.uid ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/auth"
                  }}
                />
              )
            }
          />
        );
      }}
    </UserContext.Consumer>
  );
};
