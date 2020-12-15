import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 1px 3px #00000029",
    maxHeight: "64px",
  },
  wrapper: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flexGrow: 1,
    color: "#2B2C43",
  },
  navItem: {
    color: "#2B2C43",
    textTransform: "capitalize",
    textDecoration: "none",
  },
  icon: {
    marginRight: "5px",
  },
}));
