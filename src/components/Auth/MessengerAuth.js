import React, { useState } from "react";
import firebase from "../../firebase";
import firebaseLib from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const MessengerAuth = (props) => {

  const go = () => ( window.location.href = '/')
  const [uiConfig] = useState({
    signInFlow: "popup",
    signInOptions: [
      firebaseLib.auth.GoogleAuthProvider.PROVIDER_ID,
      firebaseLib.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => go()
    }
  });

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
};

export default MessengerAuth;
