import React, { useState, useContext } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { LoginContext } from "../../context/LoginContext";

export default function EditPassword() {
  const classes = useStyles();
  const history = useHistory();
  const dataStorageUser = JSON.parse(localStorage.getItem("dataStorageUser"));
  const url = "http://localhost:80/aplatform-api/api/users/update.php";
  const [values, setValues] = useState({
    id: dataStorageUser.id,
    username: dataStorageUser.username,
    password: dataStorageUser.password,
    showPassword: false,
  });

  const [dataUser, setDataUser, ,] = useContext(LoginContext);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    Axios.put(`${url}?id=${dataStorageUser.id}`, {
      username: values.username,
      password: values.password,
    }).then((response) => {
      console.log(response);
      setDataUser({
        username: response.data.username,
        password: response.data.password,
      });
      setValues({ ...values, username: "", password: "" });
      localStorage.setItem("dataStorageUser", JSON.stringify(response.data.users));
      alert("Edit Password Berhasil!");
      history.push("/movies-editor");
    });
  };

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.container}>
        <Typography className={classes.heading} variant="h5">
          Edit Password
        </Typography>
        <Grid container alignItems="stretch">
          <Grid item xs sm md lg className={classes.formWrapper}>
            <TextField
              disabled
              id="outlined-basic"
              label="Username"
              name="username"
              variant="outlined"
              value={values.username}
              onChange={handleChange}
            />
            <FormControl className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <div className={classes.btnWrapper}>
              <Button
                variant="contained"
                size="large"
                className={classes.btnTitle}
                onClick={handleClick}
              >
                Change Password
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
      {console.log("Ini Values", values)};{console.log("Ini Data User", dataUser)};
    </div>
  );
}
