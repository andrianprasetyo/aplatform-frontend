import React, { useContext } from "react";
import { Typography, Button } from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

export default function Greeting() {
  const classes = useStyles();
  const dataStorageUser = JSON.parse(localStorage.getItem("dataStorageUser"));
  const [dataUser, setDataUser, , setIsLoggedIn] = useContext(LoginContext);

  const handleLogout = () => {
    setDataUser({ ...dataUser, username: "", password: "" });
    setIsLoggedIn(false);
    localStorage.clear();
  };
  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.titleGreeting}>
        Hi, <b>{dataStorageUser.username} </b>
      </Typography>
      <div>
        <Link to="/edit-password" className={classes.btn}>
          <Button variant="outlined" size="large" className={classes.btn}>
            Edit Password
          </Button>
        </Link>
        <Link to="/" className={classes.btn}>
          <Button
            variant="outlined"
            size="large"
            className={classes.btn}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
}
