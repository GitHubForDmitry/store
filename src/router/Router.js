import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Home from "../screen/Home";
import LockOpenIcon from '@material-ui/icons/LockOpen';
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
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    marginTop: 0,
    zIndex: 1,
    height: "100vh",
    backgroundColor: "#f1f1f1",
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
    backgroundColor: "#f1f1f1"
  },
  media: {
    width: 50,
    height: 50,
    margin: "0 auto",
    paddingHorizontal: 20
  },
  avatar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#f1f1f1",
    minWidth: 150,
    padding: 10
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
  const { userImage, displayName, signOut } = useContext(AppContext);
  useEffect(() => {}, [userImage]);
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
                      <HomeIcon />
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/catalog">
                      {" "}
                      <ListIcon />
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    {!!userImage ? (
                      <ExitToAppIcon onClick={signOut} />
                    ) : (
                      <Link to="/signIn"><LockOpenIcon /></Link>
                    )}
                  </MenuItem>
                </Menu>
              </Paper>
              {userImage && (
                <Paper className={classes.avatar}>
                  <Avatar
                    style={{ marginRight: 10 }}
                    alt={displayName}
                    src={userImage}
                  />
                  <Typography
                    variant="h6"
                    style={{
                      display: "flex",
                      justify: "center",
                      alignItems: "center"
                    }}
                  >
                    {displayName}
                  </Typography>
                </Paper>
              )}
            </Grid>
          </Grid>

          <Switch>
            <Route exact path="/">
              <Home />
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
