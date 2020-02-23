import React from 'react';
import Card from "../components/Card";
import {GridList} from "@material-ui/core";

function Catalog(props) {
    return (
        <GridList>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </GridList>
    );
}

export default Catalog;