import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Home from "../screen/Home";
import Contacts from "../screen/Contacts";
import Catalog from "../screen/Catalog";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../assets/images/background.jpg";
import { Box } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Admin from "../screen/Admin";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    marginTop: 0,
    zIndex: 1,
    height: "100vh",
    backgroundImage: `url(${Image})`,
    objectFit: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflowX: "hidden"
  },
  subRoot: {
    flexGrow: 1,
    width: "100%",
    marginTop: 0,
    zIndex: 2,
    height: "100vh",
    backgroundColor: `rgba(255,255,255, 0.3)`,
    objectFit: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundImage: `url(${"../assets/images/background.jpg"})`
  }
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
  return (
    <Router>
      <Box className={classes.root}>
        <Box className={classes.subRoot}>
          <Grid container>
            <Grid item xs={1}>
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
                    <Link to="/">Главная</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/contacts">Контакты</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/catalog">Каталог</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/admin">Admin</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/signIn">SignIn</Link>
                  </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link to="/signUp">SignUp</Link>
                    </MenuItem>
                </Menu>
              </Paper>
            </Grid>
          </Grid>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/contacts">
              <Contacts />
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
