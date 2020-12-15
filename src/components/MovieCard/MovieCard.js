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

  const timeConvert = (number) => {
    let hours = Math.floor(number / 60);
    let minutes = number % 60;
    if (hours <= 0) {
      hours = "";
    } else {
      hours = `${hours} hours`;
    }
    if (minutes <= 0) {
      minutes = "";
    } else {
      minutes = `${minutes} min`;
    }
    return `${hours} ${minutes}`;
  };

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
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
            {checkNull(props.title)}
          </Typography>
          <Divider className={classes.divider} />
          <div>
            <Typography className={classes.infoDialog}>
              <b>Rating: </b>
              {checkNull(props.rating)}
            </Typography>
            <Typography className={classes.infoDialog}>
              <b>Genre: </b>
              {checkNull(props.genre)}
            </Typography>
            <Typography className={classes.infoDialog}>
              <b>Release: </b>
              {checkNull(props.year)}
            </Typography>
            <Typography className={classes.infoDialog}>
              <b>Duration: </b>
              {checkNull(timeConvert(props.duration))}
            </Typography>
            <Divider className={classes.divider} />
            <Typography className={classes.infoDialog}>
              <b>Description: </b>
              <br />
              {checkNull(props.description)}
            </Typography>
            <Divider className={classes.divider} />
            <Typography className={classes.infoDialog}>
              <b>Review: </b>
              <br />
              {checkNull(props.review)}
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
            src={props.image_url !== null ? props.image_url : Placeholder}
          />
        </Grid>
        <Grid item xs={7} sm={7} md={7} lg={7}>
          <CardContent className={classes.content}>
            <Typography variant="h6" className={classes.title}>
              {checkNull(props.title)}
            </Typography>
            <div>
              <Typography className={classes.info}>
                Rating:
                <span>
                  <b>{checkNull(props.rating)}</b>
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
                  <b> {checkNull(props.year)}</b>
                </span>
              </Typography>
              <Typography className={classes.info}>
                Duration:
                <span>
                  <b>{checkNull(timeConvert(props.duration))}</b>
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
