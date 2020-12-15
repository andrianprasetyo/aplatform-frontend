import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  container: {
    margin: "auto",
  },
  heading: {
    textAlign: "center",
  },
  margin: {
    margin: "25px 0px",
  },
  formWrapper: {
    margin: "35px auto",
    display: "flex",
    flexDirection: "column",
  },
  btnWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnTitle: {
    textTransform: "capitalize",
    textDecoration: "none",
  },
}));
