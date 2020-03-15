import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
}));

export const Preloader = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
}