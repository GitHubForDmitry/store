import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../context/AppContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "../components/Card";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    flexDirection: "column"
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
    onChange,
    imageValue,
    addPreparedCard,
    uploadToTheFireBase,
    goodsFromFB,
    removePreparedCard,

  } = useContext(AppContext);
  return (
    <div className={classes.root}>
      <Button onClick={addPreparedCard}>add Card</Button>
      <Button onClick={uploadToTheFireBase}>uploadToTheFireBase</Button>
      <TextField value={title} onChange={text => setTitle(text.target.value)} />
      <TextField
        value={content}
        onChange={text => setContent(text.target.value)}
      />
      <Button variant="contained" component="label">
        Upload File
        <input type="file" style={{ display: "none" }} onChange={onChange} />
      </Button>
      <Typography variant="h1">Preview</Typography>
      <Card title={title} content={content} image={imageValue} />
      <div>
        {goodsFromFB !== null ? goodsFromFB.map((product, index) => (

            <div key={index}>
                <p>test</p>

                <Card
              title={product.title}
              content={product.content}
              image={product.image}
              deleteCard={() => removePreparedCard(index)}
            />
          </div>
        )): []}
      </div>
      {data.map((tile, index) => (
        <div key={tile.id}>
          <Card
            title={tile.title}
            content={tile.content}
            image={tile.image}
            deleteCard={() => removePreparedCard(index)}
          />
        </div>
      ))}
    </div>
  );
}

export default Admin;
