import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Image from "../assets/images/sportPattern.svg";
import Slider from "react-slick";
import NavBar from "../components/NavBar";

const styles = {
  root: {
    flexGrow: 1,
    width: "100vw",
    marginTop: 0,
    zIndex: 1,
    height: "100vh",
    overflow: "hidden",
    backgroundImage: `url(${Image})`,
    objectFit: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
    backgroundSize: "cover"
  },
  subRoot: {
    flexGrow: 1,
    width: "100%",
    marginTop: 0,
    zIndex: 2,
    height: "100vh",
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
          <h1>hello</h1>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Home;
