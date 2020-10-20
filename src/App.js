import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Display from "./Display";
import Form from "./Form";

function App() {
  // const url = "mongodb://localhost:27017/catsapi";
  const url = "http://localhost:4000/cats";

  const [cats, setCats] = React.useState([]);

  const emptyCat = {
    name: "",
    age: 0,
    img: "",
  };

  const emptyOwner = {
    name: "",
    age: 0,
  };

  const [selectedCat, setSelectedCat] = React.useState(emptyCat);

  const [selectedOwner, setSelectedOwner] = React.useState(emptyOwner);

  const getCats = () => {
    fetch(url + "/cats/")
      .then((response) => response.json())
      .then((data) => {
        setCats(data);
      });
  };

  // const getOwners = () => {
  //   fetch(url + "/owners/")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setOwners(data);
  //     });
  // };

  React.useEffect(() => {
    getCats();
  }, []);

  // React.useEffect(() => {
  //   getOwners();
  // }, []);

  const handleCreate = (newCat) => {
    fetch(url + "/cats", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCat),
    }).then((response) => getCats());
  };

  // const handleCreate = (newOwner) => {
  //   fetch(url + "/owners", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(owner),
  //   }).then((response) => getOwners());
  // };

  const handleUpdate = (cat) => {
    fetch(url + "/cats/" + cats._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cat),
    }).then((response) => getCats());
  };

  // const handleUpdate = (owner) => {
  //   fetch(url + "/owners/" + owners._id, {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(owner),
  //   }).then((response) => getOwners());
  // };

  const selectCat = (cat) => {
    setSelectedCat(cat);
  };

  const selectOwner = (owner) => {
    setSelectedOwner(owner);
  };

  const deleteCat = (cat) => {
    fetch(url + "/cats" + cats._id, {
      method: "delete",
    }).then((response) => getCats());
  };

  return (
    <div className="App">
      <h1>Choose Your Cat</h1>
      <Link to="/create">
        <button>Add Cat </button>
      </Link>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display
                {...rp}
                cats={cats}
                selecyCat={selectCat}
                deleteCat={deleteCat}
              />
            )}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                cat={emptyCat}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            redner={(rp) => (
              <Form
                {...rp}
                label="update"
                cat={selectedCat}
                handleSubmit={handleUpdate}
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
