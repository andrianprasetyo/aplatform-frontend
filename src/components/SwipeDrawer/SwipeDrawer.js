import React, { useState } from "react";
import useStyles from "./styles.js";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Typography } from "@material-ui/core";

export default function SwipeDrawer(props) {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = () => () => {
    setDrawerState(!drawerState);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List className={classes.listDrawer}>
        <ListItem>
          <Typography variant="h6" className={classes.title}>
            A-Platform
          </Typography>
        </ListItem>
        <Divider />
        <ListItem className={classes.navWrapper}>{props.item}</ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="primary"
        aria-label="menu"
        onClick={toggleDrawer()}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor={"left"}
        open={drawerState}
        onClose={toggleDrawer()}
        onOpen={toggleDrawer()}
      >
        {list("left")}
      </SwipeableDrawer>
    </div>
  );
}
