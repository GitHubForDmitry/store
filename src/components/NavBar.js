import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {withRouter} from "react-router";
import AppContext from "../context/AppContext";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    avatar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        textAlign: "center",
        backgroundColor: "transparent",
        color: "#fff",
        minWidth: 150,
        padding: 10
    },
}));

const NavBar = (props) => {
    const classes = useStyles();
    const { isSignedIn, displayName, userImage } = React.useContext(AppContext);
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar style={{justifyContent: "flex-end"}}>
                    { !isSignedIn ?
                    <Button color="inherit" onClick={() => props.history.push("/signIn")}>Login</Button> :
                         (
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
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(NavBar)