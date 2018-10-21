import { auth } from ".";

const handleCodeErr = err => {
  switch (err.code) {
    case "auth/user-not-found":
      return "User not found";
    default:
      return null;
  }
};

export const createUser = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
};

export const signIn = (email, password, handleErr) => {
  return auth.signInWithEmailAndPassword(email, password).catch(err => {
    const errMsg = handleCodeErr(err);
    handleErr(errMsg);
  });
};

export const signOut = () => {
  auth
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
    });
};
