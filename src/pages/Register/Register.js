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
import { Link } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import Axios from "axios";

export default function Register() {
  const classes = useStyles();
  const url = "http://localhost:80/aplatform-api/api/users/create.php";
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [, setDataUser, ,] = useContext(LoginContext);

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
    Axios.post(url, { username: values.username, password: values.password })
      .then((response) => {
        console.log(response);
        setDataUser({
          username: values.username,
          password: values.password,
        });
        alert("Silahkan Login");
      })
      .catch((error) => {
        console.log(error);
        alert("Mohon Lengkapi Semua Datanya!");
      });
  };

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.container}>
        <Typography className={classes.heading} variant="h5">
          Register
        </Typography>
        <Grid container alignItems="stretch">
          <Grid item xs sm md lg className={classes.formWrapper}>
            <TextField
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
              <Link to="/login" className={classes.btnTitle}>
                <Button size="large" className={classes.btnTitle}>
                  Sudah Punya Akun?
                </Button>
              </Link>
              <Link to="/login" className={classes.btnTitle}>
                <Button
                  variant="contained"
                  size="large"
                  className={classes.btnTitle}
                  onClick={handleClick}
                >
                  Register
                </Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
