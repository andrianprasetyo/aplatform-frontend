import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "215px",
    margin: 0,
  },
  cover: { height: "100%", width: "100%", objectFit: "cover" },
  content: {
    display: "flex",
    height: "90%",
    flexDirection: "column",
    padding: "0px 0px 0px",
    overflow: "auto",
  },
  title: {
    fontWeight: "bold",
    margin: "10px 10px 15px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "250px",
  },
  info: {
    fontWeight: "lighter",
    fontSize: "14px",
    margin: "2px 10px 0",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "250px",
  },
  btn: {
    margin: "30px 10px 0",
    textTransform: "capitalize",
    width: "90%",
  },
  divider: {
    margin: "10px 0",
  },
  coverDialog: { height: "100%", objectFit: "cover" },
  titleDialog: {
    fontWeight: "bold",
    margin: "20px 20px 10px",
    maxWidth: "250px",
  },
  infoDialog: {
    fontWeight: "normal",
    fontSize: "14px",
    margin: "2px 20px 0",
  },
  contentDialog: {
    display: "flex",
    flexDirection: "column",
    padding: "0 0 0 0",
  },
  dialogContainer: {
    margin: "auto",
    width: "90%",
    borderRadius: "10px",
  },
}));
