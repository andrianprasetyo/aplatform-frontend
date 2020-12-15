import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  navWrapper: {
    maxWidth: 150,
    margin: "0 30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: 250,
  },
  title: {
    flexGrow: 1,
    margin: "0 30px 5px",
    color: "#2B2C43",
  },
  navItem: {
    color: "#2B2C43",
    textTransform: "capitalize",
    textDecoration: "none",
    marginBottom: theme.spacing(2),
  },
}));
