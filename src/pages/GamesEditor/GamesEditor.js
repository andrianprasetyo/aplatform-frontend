import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import useStyles from "./styles";
import TableGame from "../../components/TableGame/TableGame";
import Greeting from "../../components/Greeting/Greeting";

export default function GamesEditor() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.container}>
        <Greeting />
        <TableGame />
      </div>
      <Footer />
    </div>
  );
}
