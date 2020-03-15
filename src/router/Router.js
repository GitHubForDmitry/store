import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Catalog from "../screen/Catalog";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Admin from "../screen/Admin";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import AppContext from "../context/AppContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from "@material-ui/icons/Settings";
import { Preloader } from "../components/Preloader"
import Home from "../screen/Home";
import NavBar from "../components/NavBar";
import Image from "../assets/images/sportPattern.svg";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    zIndex: 1,
    height: "100vh",
    objectFit: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflowX: "hidden",
    minHeight: "100%",
    maxHeight: "100%",
    backgroundImage: `url(${Image})`,
    position: 'relative',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
  },

  paper: {
    position: "absolute",
    top: 10,
    left: 10,
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: "#f1f1f1",
    zIndex: 20
  },
  media: {
    width: 50,
    height: 50,
    margin: "0 auto",
    paddingHorizontal: 20
  },

  icon: {width: 50, height: 50}
}));
function RouterComponent(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { signOut, goodsFromFB } = useContext(AppContext);
  return (
    <Router>
      <Box className={classes.root}>
        <Box className={classes.subRoot}>
          <Grid container direction="row">
            <Grid container direction="row" justify="space-around">
              <Paper className={classes.paper}>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MenuIcon color="primary" />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link to="/">
                      <HomeIcon  className={classes.icon}/>
                    </Link>
                  </MenuItem>{" "}
                  <MenuItem onClick={handleClose}>
                    <Link to="/admin">
                      <SettingsIcon  className={classes.icon}/>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/catalog">
                      {" "}
                      <ListIcon className={classes.icon} />
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    {!!goodsFromFB.length ? (
                      <ExitToAppIcon onClick={signOut} />
                    ) : (
                      <Link to="/signIn">
                        <LockOpenIcon  className={classes.icon}/>
                      </Link>
                    )}
                  </MenuItem>
                </Menu>
              </Paper>
              <NavBar/>
            </Grid>
          </Grid>

          <Switch>
            <Route exact path="/">
              { !!goodsFromFB.length ?

                    <Home />: <Preloader/>
              }
            </Route>
            <Route path="/catalog">
              <Catalog />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/signIn">
              <SignIn />
            </Route>
            <Route path="/signUp">
              <SignUp />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Router>
  );
}

export default RouterComponent;
