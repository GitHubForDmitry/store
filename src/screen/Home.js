import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Image from "../assets/images/sportPattern.svg";
import NavBar from "../components/NavBar";
import Catalog from "./Catalog";
import { FilterArea } from "../components/FilterArea";

const styles = {
  root: {
    minHeight: "100%",
    maxHeight: "100%",
    backgroundImage: `url(${Image})`,
    position: 'relative',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
  },
  subRoot: {
    flexGrow: 1,
    width: "100%",
    marginTop: 0,
    zIndex: 2,
    minHeight: "100vh",
    maxHeight: "100%",
    backgroundColor: `rgba(255,255,255, 0.6)`,
    objectFit: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }
};
function Home(props) {
  return (
    <Grid xl={12} style={styles.root}>
      <Grid xl={12} style={styles.subRoot}>
        <NavBar/>
        <Container>
          <FilterArea />
          <Catalog />
        </Container>
      </Grid>
    </Grid>
  );
}

export default Home;
