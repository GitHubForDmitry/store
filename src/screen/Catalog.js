import React, {useContext} from 'react';
import Card from "../components/Card";
import {GridList} from "@material-ui/core";
import AppContext from "../context/AppContext";

function Catalog(props) {
    const {goodsFromFB} = useContext(AppContext);
    return (
        <GridList>
            {goodsFromFB !== null && goodsFromFB.map((product) =>
                <Card
                    key={product.id}
                    title={product.title}
                    content={product.content}
                    image={product.image}
                    trash={false}
                />
            )}
        </GridList>
    );
}

export default Catalog;