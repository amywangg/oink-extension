import React, { Component } from "react";
import { connect } from "react-redux";
// import { AppHeader } from "@material-ui/core";
import { auth, authFailed, authSuccess } from "../../redux/actions";
import Oink from "./oink";
import unAuthed from "./unAuthed";
import "./App.css";
import { checkAuth } from "../../redux/api";

export function App({ storeUser }) {
  let user = checkAuth();
  if (user !== null) {
    storeUser(user);
  }

  // const { user } = this.props;
  const View = user === null ? Oink : unAuthed;

  return (
    <div className="App">
      {/* <AppHeader as="h3" attached="top" textAlign="center" inverted color="teal">
          Oink
        </AppHeader> */}
      <div className="App-view">
        <View user={user} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  storeUser: (user) => dispatch(auth(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
