import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  AppBar,
  Button,
  Divider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { auth } from "../../redux/actions";
import Oink from "./Oink";
import UnAuthed from "./UnAuthed";
import "./App.css";
import { checkAuth } from "../../redux/api";
import oinkIcon2 from "./oink-icon-2.png";

export function App({ storeUser }) {
  const [user, setUser] = useState(null);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(1.5),
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    setTimeout(async () => {
      let temp = await checkAuth();
      if (temp !== null) {
        await setUser(temp);
        // store user in redux
        await storeUser(temp);
      }
    }, 1000);
  }, []);

  return (
    <div className="App">
      <AppBar position="static" color="white" elevation={0}>
        <Toolbar>
          <img
            className={classes.menuButton}
            width={30}
            height={30}
            alt="oinkicon"
            src={oinkIcon2}
          />
          <Typography variant="h6" color="secondary">
            Oink
          </Typography>
          <div style={{ position: "absolute", marginRight: 3, right: 6 }}>
            <Button
              color="inherit"
              onClick={() => {
                window.close();
              }}
            >
              x
            </Button>
          </div>
        </Toolbar>
        <Divider />
      </AppBar>
      <div className="App-view">
        {user === null ? <UnAuthed /> : <Oink user={user} />}
      </div>
    </div>
  );
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  storeUser: (user) => dispatch(auth(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
