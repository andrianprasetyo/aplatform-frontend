import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  Divider,
  DialogActions,
} from "@material-ui/core";
import Placeholder from "../../assets/image/placeholder.png";
import useStyles from "./styles";

export default function MovieCard(props) {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const checkNull = (data) => {
    if (data === null) {
      return "-";
    } else {
      return data;
    }
  };

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const checkPlayer = (data) => {
    if (data === 1) {
      return "Yes";
    } else if (data === 0) {
      return "No";
    } else {
      return "-";
    }
  };

  const dialogBody = (
    <Grid container>
      <Grid item xs={5} sm={5} md={5} lg={5}>
        <CardMedia
          className={classes.coverDialog}
          component="img"
          src={props.image_url !== null ? props.image_url : Placeholder}
        />
      </Grid>
      <Grid item xs={7} sm={7} md={7} lg={7}>
        <CardContent className={classes.contentDialog}>
          <Typography
            variant="h6"
            className={classes.titleDialog}
            color="secondary"
          >
            {checkNull(props.name)}
          </Typography>
          <Divider className={classes.divider} />
          <div>
            <Typography className={classes.infoDialog}>
              <b>Platform: </b>
              {checkNull(props.platform)}
            </Typography>
            <Typography className={classes.infoDialog}>
              <b>Genre: </b>
              {checkNull(props.genre)}
            </Typography>
            <Typography className={classes.infoDialog}>
              <b>Release: </b>
              {checkNull(props.release)}
            </Typography>
            <Typography className={classes.infoDialog}>
              <b>Single Player: </b>
              {checkPlayer(props.singlePlayer)}
            </Typography>
            <Typography className={classes.infoDialog}>
              <b>Multi Player: </b>
              {checkPlayer(props.multiplayer)}
            </Typography>
          </div>
          <DialogActions>
            <Button color="secondary" onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </CardContent>
      </Grid>
    </Grid>
  );

  return (
    <Card className={classes.container}>
      <Grid container>
        <Grid item xs={5} sm={5} md={5} lg={5}>
          <CardMedia
            className={classes.cover}
            component="img"
            src={props.image_url === null ? Placeholder : props.image_url}
          />
        </Grid>
        <Grid item xs={7} sm={7} md={7} lg={7}>
          <CardContent className={classes.content}>
            <Typography variant="h6" className={classes.title}>
              {checkNull(props.name)}
            </Typography>
            <div>
              <Typography className={classes.info}>
                Platform:
                <span>
                  <b>{checkNull(props.platform)}</b>
                </span>
              </Typography>
              <Typography className={classes.info}>
                Genre:
                <span>
                  <b>{checkNull(props.genre)}</b>
                </span>
              </Typography>
              <Typography className={classes.info}>
                Release:
                <span>
                  <b>{checkNull(props.release)}</b>
                </span>
              </Typography>
            </div>
            <Button
              variant="outlined"
              size="medium"
              className={classes.btn}
              color="secondary"
              onClick={handleOpen}
            >
              See Detail
            </Button>
            <Dialog
              open={openDialog}
              onClose={handleClose}
              className={classes.dialogContainer}
              aria-labelledby="dialog-title"
              aria-describedby="dialog-description"
            >
              {dialogBody}
            </Dialog>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
