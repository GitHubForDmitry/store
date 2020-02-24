import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "5px auto",
    maxWidth: 300,
    flexDirection: "column"
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center"
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

export default function Card({ title, content, deleteCard, image, trash = true }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.imageWrapper}>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                src={image}
                alt={image}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {content}
                </Typography>
              </Grid>
              <Grid item>
                {trash && (
                  <ButtonBase
                    onClick={deleteCard}
                    variant="body2"
                    style={{ cursor: "pointer" }}
                  >
                    <DeleteOutlineIcon />
                  </ButtonBase>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
