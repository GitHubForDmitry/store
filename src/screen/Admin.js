import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../context/AppContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import FireplaceIcon from "@material-ui/icons/Fireplace";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Card from "../components/Card";
import Grid from "@material-ui/core/Grid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    flexDirection: "column",
    padding: 5
  },
  block: {
    justifyContent: "center",
    alignItems: "center"
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  button: {
    margin: theme.spacing(1),
    minWidth: 150,
    maxWidth: 300
  },
  field: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  wrap: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.paper,
    padding: 5,
    marginVertical: 20
  }
}));

function Admin(props) {
  const classes = useStyles();

  const {
    data,
    title,
    setTitle,
    content,
    setContent,
    description,
    setDescription,
    onChange,
    imageValue,
    addPreparedCard,
    uploadToTheFireBase,
    goodsFromFB,
    removePreparedCard
  } = useContext(AppContext);
  return (
    <div className={classes.root}>
      <ToastContainer
        containerId={"addCard"}
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <ToastContainer
        containerId={"fillAllFields"}
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Grid item xs={12} sm container spacing={2}>
        <Grid
          item
          xs={6}
          container
          direction="column"
          spacing={2}
          className={classes.block}
        >
          <Button
            className={classes.button}
            startIcon={<AddShoppingCartIcon />}
            variant="contained"
            color="primary"
            onClick={addPreparedCard}
          >
            Добавить карточку
          </Button>

          <TextField
            label="Поле 1"
            className={classes.field}
            value={title}
            onChange={text => setTitle(text.target.value)}
          />
          <TextField
            label="Поле 2"
            className={classes.field}
            value={content}
            onChange={text => setContent(text.target.value)}
          />
          <TextField
            label="Поле 3"
            className={classes.field}
            value={description}
            onChange={text => setDescription(text.target.value)}
          />
          <Button
            className={classes.button}
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Загрузить картинку
            <input
              type="file"
              style={{ display: "none" }}
              onChange={onChange}
            />
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          container
          direction="column"
          spacing={2}
          className={classes.block}
        >
          <Typography variant="h5">Предпросмотр</Typography>
          <Card title={title} content={content} image={imageValue} description={description} />
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Button
          className={classes.button}
          startIcon={<FireplaceIcon />}
          variant="contained"
          color="primary"
          onClick={uploadToTheFireBase}
        >
          Загрузить все данные
        </Button>
      </Grid>
      <Grid item xs={12} container spacing={2} className={classes.wrap}>
        {goodsFromFB !== null
          ? goodsFromFB.map((product, index) => (
              <div key={index}>
                <Typography>загружено в базу данных</Typography>
                <Card
                  title={product.title}
                  content={product.content}
                  description={product.description}
                  image={product.image}
                  deleteCard={() => {
                    removePreparedCard(product.id);
                  }}
                />
              </div>
            ))
          : []}
        {data.map((tile, index) => (
          <div key={tile.id}>
            <Card
              title={tile.title}
              content={tile.content}
              description={tile.description}
              image={tile.image}
              deleteCard={() => removePreparedCard(tile.id)}
            />
          </div>
        ))}
      </Grid>
    </div>
  );
}

export default Admin;
