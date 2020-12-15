import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import useStyles from "./styles";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CardMedia,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import GameCard from "../../components/GameCard/GameCard";
import GamesBanner from "../../assets/image/banner-games.png";
import Footer from "../../components/Footer/Footer";
import { GamesContext } from "../../context/GamesContext";

export default function Games() {
  const classes = useStyles();
  const url = "http://localhost:80/aplatform-api/api/games/read.php";

  const [dataGames, setDataGames] = useContext(GamesContext);

  const [values, setValues] = useState({ keyword: "Search Games Disini..." });

  useEffect(() => {
    if (dataGames === null || values.keyword === "") {
      Axios.get(url)
        .then((response) => {
          console.log("[Data Games]: ", response);
          setDataGames(
            response.data.games.map((game) => {
              return {
                id: game.id,
                name: game.name,
                genre: game.genre,
                singlePlayer: game.singlePlayer,
                multiplayer: game.multiplayer,
                platform: game.platform,
                release: game.release,
                image_url: game.image_url,
              };
            })
          );
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [dataGames]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setValues({ keyword: value });
    const filtered = dataGames.filter((game) => {
      return game.name.toLowerCase().includes(value.toLowerCase());
    });
    setDataGames(filtered);
  };

  return (
    <div className={classes.root}>
      <NavBar />
      <Card className={classes.container}>
        <CardMedia component="img" src={GamesBanner} />
        <CardContent>
          <Typography className={classes.heading} variant="h6">
            Browse by genre
          </Typography>

          <div className={classes.btnWrapper}>
            <div>
              {dataGames !== null &&
                dataGames
                  .map((game) => {
                    return (
                      <Button key={game.id} variant="outlined" size="large" className={classes.btn}>
                        {game.genre}
                      </Button>
                    );
                  })
                  .slice(0, 3)}
            </div>

            <div>
              <FormControl className={classes.searchMargin} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-search"
                  value={values.search}
                  onChange={handleSearch}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  labelWidth={60}
                />
              </FormControl>
            </div>
          </div>

          <Grid container alignItems="stretch" spacing={3}>
            {dataGames !== null &&
              dataGames.map((game) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={game.id}>
                    <GameCard
                      id={game.id}
                      name={game.name}
                      genre={game.genre}
                      singlePlayer={parseInt(game.singlePlayer)}
                      multiplayer={parseInt(game.multiplayer)}
                      platform={game.platform}
                      release={game.release}
                      image_url={game.image_url}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
}
