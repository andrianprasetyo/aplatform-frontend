import React, { useState, forwardRef, useContext, useEffect } from "react";
import Axios from "axios";
import MaterialTable from "material-table";
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons/";
import { MoviesContext } from "../../context/MoviesContext";

export default function TableMovie(props) {
  const url = "http://localhost:80/aplatform-api/api/movies";
  const [, setDataMovies] = useContext(MoviesContext);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const getDataMovies = () => {
    // setDataMovies
    Axios.get(`${url}/read.php`)
      .then((response) => {
        console.log("[GetDataMovies]: ", response);
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

        // setState Tabel
        setState({
          ...state,
          data: response.data.movies.map((movie) => {
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
          }),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddDataMovies = (newData) => {
    Axios.post(`${url}/create.php`, {
      title: newData.title,
      description: newData.description,
      year: newData.year,
      duration: newData.duration,
      genre: newData.genre,
      rating: newData.rating,
      review: newData.review,
      image_url: newData.image_url,
    })
      .then((response) => {
        console.log("[Post]: ", response.status);

        setState((prevState) => {
          const data = [...prevState.data];
          data.push(newData);
          return { ...prevState, data };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditDataMovies = (newData, oldData) => {
    Axios.put(`${url}/update.php?id=${newData.id}`, {
      id: newData.id,
      title: newData.title,
      description: newData.description,
      year: newData.year,
      duration: newData.duration,
      genre: newData.genre,
      rating: newData.rating,
      review: newData.review,
      image_url: newData.image_url,
    })
      .then((response) => {
        console.log("[Edit]: ", response.status);

        // UDPATE STATE
        if (oldData) {
          setState((prevState) => {
            const data = [...prevState.data];
            console.log("[Old Data Clone]: ", data);
            data[data.indexOf(oldData)] = newData;
            return { ...prevState, data };
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteDataMovies = (oldData) => {
    Axios.delete(`${url}/delete.php?id=${oldData.id}`)
      .then((response) => {
        console.log("[Delete]: ", response.status);

        // UDPATE STATE
        setState((prevState) => {
          const data = [...prevState.data];
          data.splice(data.indexOf(oldData), 1);
          return { ...prevState, data };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataMovies();
  }, []);

  const [state, setState] = useState({
    columns: [
      {
        title: "ID",
        field: "id",
        type: "numeric",
        editable: "never",
      },
      {
        title: "Title",
        field: "title",
        cellStyle: {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: 150,
        },
      },
      {
        title: "Description",
        field: "description",
        cellStyle: {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: 200,
        },
      },
      { title: "Release Year", field: "year", type: "numeric" },
      { title: "Duration", field: "duration", type: "numeric" },
      {
        title: "Genre",
        field: "genre",
        cellStyle: {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: 150,
        },
      },
      {
        title: "Rating",
        field: "rating",
        type: "numeric",
        lookup: {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          10: 10,
        },
        cellStyle: {
          maxWidth: 50,
        },
      },
      {
        title: "Review",
        field: "review",
        cellStyle: {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: 150,
        },
      },
      {
        title: "URL Image",
        field: "image_url",
        cellStyle: {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: 150,
        },
      },
    ],
    data: [],
  });

  return (
    <MaterialTable
      title="Movies Editor"
      columns={state.columns}
      data={state.data}
      icons={tableIcons}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              handleAddDataMovies(newData);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              handleEditDataMovies(newData, oldData);
              console.log("[New Data]", newData);
              console.log("[Old Data]", oldData);
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              handleDeleteDataMovies(oldData);
            }, 600);
          }),
      }}
    ></MaterialTable>
  );
}
