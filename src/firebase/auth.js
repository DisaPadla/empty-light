import { auth } from ".";

const handleCodeErr = err => {
  switch (err.code) {
    case "auth/user-not-found":
      return "User not found";
    default:
      return null;
  }
};

export const createUser = (email, password, handleErr) => {
  return auth.createUserWithEmailAndPassword(email, password).catch(err => {
    const errMsg = handleCodeErr(err);
    handleErr(errMsg);
  });
};

export const signIn = (email, password, handleErr) => {
  return auth.signInWithEmailAndPassword(email, password).catch(err => {
    const errMsg = handleCodeErr(err);
    handleErr(errMsg);
  });
};

export const signOut = () => {
  return auth.signOut();
};
