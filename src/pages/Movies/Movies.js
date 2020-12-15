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
import MovieCard from "../../components/MovieCard/MovieCard";
import MoviesBanner from "../../assets/image/banner-movies.png";
import Footer from "../../components/Footer/Footer";
import { MoviesContext } from "../../context/MoviesContext";

export default function Movies() {
  const classes = useStyles();
  const url = "http://localhost:80/aplatform-api/api/movies/read.php";

  const [dataMovies, setDataMovies] = useContext(MoviesContext);

  const [values, setValues] = useState({
    keyword: "Search Movies Disini...",
  });

  useEffect(() => {
    if (dataMovies === null || values.keyword === "") {
      Axios.get(url)
        .then((response) => {
          console.log("[Data Movies]: ", response);
          setDataMovies(
            response.data.movies.map((movie) => {
              return {
                id: movie.id,
                title: movie.title,
                description: movie.description,
                year: movie.year,
                duration: movie.duration,
                genre: movie.genre,
                rating: movie.rating,
                review: movie.review,
                image_url: movie.image_url,
              };
            })
          );
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [dataMovies]);

  const handleSearch = (event) => {
    setValues({ keyword: "" });
    const value = event.target.value;
    setValues({ keyword: value });
    const filtered = dataMovies.filter((movie) => {
      return movie.title.toLowerCase().includes(value.toLowerCase());
    });
    setDataMovies(filtered);
  };

  return (
    <div className={classes.root}>
      <NavBar />
      <Card className={classes.container}>
        <CardMedia component="img" src={MoviesBanner} />
        <CardContent>
          <Typography className={classes.heading} variant="h6">
            Browse by genre
          </Typography>

          <div className={classes.btnWrapper}>
            <div>
              {dataMovies !== null &&
                dataMovies
                  .map((movie) => {
                    return (
                      <Button
                        key={movie.id}
                        variant="outlined"
                        size="large"
                        className={classes.btn}
                      >
                        {movie.genre}
                      </Button>
                    );
                  })
                  .slice(0, 3)}
            </div>

            <div>
              <FormControl className={classes.searchMargin} variant="outlined" color="secondary">
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
            {dataMovies !== null &&
              dataMovies.map((movie) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={movie.id}>
                    <MovieCard
                      id={movie.id}
                      title={movie.title}
                      description={movie.description}
                      year={movie.year}
                      duration={movie.duration}
                      genre={movie.genre}
                      rating={movie.rating}
                      review={movie.review}
                      image_url={movie.image_url}
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
