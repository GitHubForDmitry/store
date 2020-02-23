import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from "../context/AppContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "../components/Card";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        flexDirection: "column"
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

function Admin(props) {
    const classes = useStyles();
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const {data, addCard, deleteCard, onChange, imageValue} = useContext(AppContext);

    return (
        <div className={classes.root}>
            <button onClick={() => addCard(title, content, imageValue)}>add Card</button>
            <TextField value={title} onChange={text => setTitle(text.target.value)}/>
            <TextField value={content} onChange={text => setContent(text.target.value)}/>
            <Button
                variant="contained"
                component="label"
            >
                Upload File
                <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={onChange}
                />
            </Button>
            <div>
                <Card title={title} content={content} image={imageValue} />
            </div>
                {data.map((tile, index) => (
                    <div key={tile.id}>
                        <Card title={tile.title} content={tile.content} image={tile.image} deleteCard={() => deleteCard(tile.id)}/>
                    </div>
                ))}
        </div>
    );
}

export default Admin;

