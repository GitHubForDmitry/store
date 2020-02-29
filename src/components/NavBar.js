import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {withRouter} from "react-router";

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
}));

const NavBar = (props) => {
    const classes = useStyles();
    const { history } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar style={{justifyContent: "flex-end"}}>
                    <Button color="inherit" onClick={() => props.history.push("/signIn")}>Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(NavBar)