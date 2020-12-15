import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import useStyles from "./styles";
import TableMovie from "../../components/TableMovie/TableMovie";
import Greeting from "../../components/Greeting/Greeting";

export default function MoviesEditor() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.container}>
        <Greeting />
        <TableMovie />
      </div>
      <Footer />
    </div>
  );
}
