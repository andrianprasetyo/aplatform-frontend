import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Movies from "./pages/Movies/Movies";
import MoviesEditor from "./pages/MoviesEditor/MoviesEditor";
import Games from "./pages/Games/Games";
import GamesEditor from "./pages/GamesEditor/GamesEditor";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { LoginProvider } from "./context/LoginContext";
import { MoviesProvider } from "./context/MoviesContext";
import { GamesProvider } from "./context/GamesContext";
import EditPassword from "./pages/EditPassword/EditPassword";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Noto Sans JP", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      light: "#F6F6F8",
      main: "#2B2C43",
      dark: "#282123",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#DC574F",
      dark: "#ba000d",
      contrastText: "#000",
    },
    tertiary: {
      light: "#c1fba4",
      main: "#C9DA9D",
      dark: "#71843B",
      contrastText: "#fff",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <LoginProvider>
            <MoviesProvider>
              <GamesProvider>
                <Route exact path="/" component={Movies} />
                <Route exact path="/games" component={Games} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/movies-editor" component={MoviesEditor} />
                <Route exact path="/games-editor" component={GamesEditor} />
                <Route exact path="/edit-password" component={EditPassword} />
              </GamesProvider>
            </MoviesProvider>
          </LoginProvider>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
