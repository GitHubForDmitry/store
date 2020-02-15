import React from 'react';
import {Container, Grid, Typography} from "@material-ui/core";

function Home(props) {
    return (
        <Grid xl={12}>
            <Container>
                <Typography style={{color: "#fff"}} variant="h1">
                    Детская одежда
                </Typography>
            </Container>

        </Grid>
    );
}

export default Home;