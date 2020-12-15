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
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import { LoginContext } from "../../context/LoginContext";

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const url = "http://localhost:80/aplatform-api/api/users/read.php";
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [dataUser, setDataUser, , setIsLoggedIn] = useContext(LoginContext);

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
    Axios.post(url, {
      username: values.username,
      password: values.password,
    })
      .then((response) => {
        console.log("[Response]: ", response);
        if (response.data.message === "Invalid username or password!") {
          return alert("Invalid Username or Password!");
        } else if (
          response.data.message === "Oops! Sepertinya ada form yang masih kosong. Tolong isi ya"
        ) {
          return alert("Data Yang Dimasukkan Tidak Lengkap");
        } else {
          setDataUser({
            username: response.data[0].username,
            password: response.data[0].password,
          });
          console.log("[DataUser]:", dataUser);
          setValues({ ...values, username: "", password: "" });
          localStorage.setItem("dataStorageUser", JSON.stringify(response.data[0]));
          setIsLoggedIn(true);
          history.push("/movies-editor");
        }
      })
      .catch((error) => {
        console.log("[LoginError]", error);
        return alert("Invalid Username or Password!");
      });
  };

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.container}>
        <Typography className={classes.heading} variant="h5">
          Login
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
              <Link to="/register" className={classes.btnTitle}>
                <Button size="large" className={classes.btnTitle}>
                  Belum Punya Akun?
                </Button>
              </Link>

              <Button
                variant="contained"
                size="large"
                className={classes.btnTitle}
                onClick={handleClick}
              >
                Login
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
