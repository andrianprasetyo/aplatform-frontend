import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  },
  titleGreeting: {
    textAlign: "end",
  },
  btn: {
    textDecoration: "none",
    marginLeft: "10px",
  },
}));
