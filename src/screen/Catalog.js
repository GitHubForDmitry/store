import React, {useContext} from 'react';
import Card from "../components/Card";
import {GridList} from "@material-ui/core";
import AppContext from "../context/AppContext";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";

const Catalog = () => {
    const {goodsFromFB} = useContext(AppContext);
    return (
        <GridList style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
            {goodsFromFB !== null ? goodsFromFB.map((product) =>
                <Card
                    key={product.id}
                    title={product.title}
                    content={product.content}
                    image={product.image}
                    description={product.description}
                    trash={false}
                />
            ): <Typography variant="h2">Товара нету на складе</Typography>}
        </GridList>
    );
}
Catalog.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    trash: PropTypes.bool
};
export default Catalog;