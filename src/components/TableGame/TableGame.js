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
import { GamesContext } from "../../context/GamesContext";

export default function TableGame(props) {
  const url = "http://localhost:80/aplatform-api/api/games";
  const [, setDataGames] = useContext(GamesContext);

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

  const getDataGames = () => {
    // setDataGames
    Axios.get(`${url}/read.php`)
      .then((response) => {
        console.log("[GetDataGames]: ", response);
        setDataGames(
          response.data.games.map((game) => {
            return {
              id: game.id,
              name: game.name,
              release: game.release,
              platform: game.platform,
              genre: game.genre,
              singlePlayer: game.singlePlayer,
              multiplayer: game.multiplayer,
              image_url: game.image_url,
            };
          })
        );

        // setState Tabel
        setState({
          ...state,
          data: response.data.games.map((game) => {
            return {
              id: game.id,
              name: game.name,
              release: game.release,
              platform: game.platform,
              genre: game.genre,
              singlePlayer: game.singlePlayer,
              multiplayer: game.multiplayer,
              image_url: game.image_url,
            };
          }),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddDataGames = (newData) => {
    Axios.post(`${url}/create.php`, {
      name: newData.name,
      genre: newData.genre,
      singlePlayer: newData.singlePlayer,
      multiplayer: newData.multiplayer,
      platform: newData.platform,
      release: newData.release,
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

  const handleEditDataGames = (newData, oldData) => {
    Axios.put(`${url}/update.php?id=${newData.id}`, {
      id: newData.id,
      name: newData.name,
      genre: newData.genre,
      singlePlayer: newData.singlePlayer,
      multiplayer: newData.multiplayer,
      platform: newData.platform,
      release: newData.release,
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

  const handleDeleteDataGames = (oldData) => {
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
    getDataGames();
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
        title: "Name",
        field: "name",
        cellStyle: {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: 150,
        },
      },
      { title: "Release", field: "release" },
      { title: "Platform", field: "platform" },
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
        title: "Single Player",
        field: "singlePlayer",
        lookup: {
          1: "Yes",
          0: "No",
        },
      },
      {
        title: "Multi Player",
        field: "multiplayer",
        lookup: {
          1: "Yes",
          0: "No",
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
      title="Games Editor"
      columns={state.columns}
      data={state.data}
      icons={tableIcons}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              handleAddDataGames(newData);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              handleEditDataGames(newData, oldData);
              console.log("[New Data]", newData);
              console.log("[Old Data]", oldData);
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              handleDeleteDataGames(oldData);
            }, 600);
          }),
      }}
    />
  );
}
