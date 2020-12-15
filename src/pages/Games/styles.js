import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    // backgroundColor: "#F6F6F8",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  container: {
    margin: "35px auto",
    width: "90%",
    boxShadow: "0px 1px 3px #00000029",
    backgroundColor: "#FFFFFF",
  },
  searchMargin: {
    margin: theme.spacing(1),
  },
  btnWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "15px 0 30px",
  },
  btn: {
    marginRight: "15px",
    textTransform: "capitalize",
  },
}));
