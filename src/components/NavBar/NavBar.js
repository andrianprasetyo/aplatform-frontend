import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MoviesIcon from "@material-ui/icons/Movie";
import GamesIcon from "@material-ui/icons/Games";
import useStyles from "./styles.js";
import SwipeDrawer from "../SwipeDrawer/SwipeDrawer.js";
import { LoginContext } from "../../context/LoginContext";

export default function NavBar() {
  const classes = useStyles();
  const dataStorageUser = JSON.parse(localStorage.getItem("dataStorageUser"));
  const [, , isLoggedIn] = useContext(LoginContext);

  const navItem = (
    <div className={classes.navWrapper}>
      <Link className={classes.navItem} to="/">
        <Button className={classes.navItem}>
          <MoviesIcon className={classes.icon} />
          Movies
        </Button>
      </Link>
      <Link className={classes.navItem} to="/games">
        <Button className={classes.navItem}>
          <GamesIcon className={classes.icon} />
          Games
        </Button>
      </Link>

      {isLoggedIn || dataStorageUser != null ? (
        <>
          <Link className={classes.navItem} to="/movies-editor">
            <Button className={classes.navItem}>Movies Editor</Button>
          </Link>
          <Link className={classes.navItem} to="/games-editor">
            <Button className={classes.navItem}>Games Editor</Button>
          </Link>
        </>
      ) : (
        <Link className={classes.navItem} to="/login">
          <Button className={classes.navItem}>Login</Button>
        </Link>
      )}
    </div>
  );
  return (
    <>
      <AppBar className={classes.container} position="sticky">
        <Toolbar className={classes.wrapper}>
          <div className={classes.logoWrapper}>
            <SwipeDrawer item={navItem} />
            <Link className={classes.navItem} to="/">
              <Typography variant="h6" className={classes.title}>
                A-Platform
              </Typography>
            </Link>
          </div>

          <div>{navItem}</div>
        </Toolbar>
      </AppBar>
    </>
  );
}
