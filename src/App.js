import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Display from "./Display";
import Form from "./Form";

function App() {
  // URL VARIBLE
  // const url = "mongodb://localhost:27017/catsapi";
  const url = "https://mernlabbackendsu.herokuapp.com";

  const [cats, setCats] = React.useState([]);

  // empty cat for form
  const emptyCat = {
    name: "",
    age: 0,
    img: "",
  };
  // empty owner for form
  const emptyOwner = {
    name: "",
    age: 0,
  };

  // selectCat for user to select an update a cat
  const [selectedCat, setSelectedCat] = React.useState(emptyCat);

  const [selectedOwner, setSelectedOwner] = React.useState(emptyOwner);

  // function to fetch cats
  const getCats = () => {
    fetch(url + "/cats/")
      .then((response) => response.json())
      .then((data) => {
        setCats(data.data);
        console.log(`data`, data);
      });
  };

  // const getOwners = () => {
  //   fetch(url + "/owners/")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setOwners(data);
  //     });
  // };

  // get cats on page load
  React.useEffect(() => {
    getCats();
  }, []);

  // React.useEffect(() => {
  //   getOwners();
  // }, []);

  // for creating cats
  const handleCreate = (newCat) => {
    fetch(url + "/cats/", {
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

  const handleUpdate = (cats) => {
    fetch(url + "/cats/" + cats._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cats),
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

  const selectCat = (cats) => {
    setSelectedCat(cats);
  };

  const selectOwner = (owners) => {
    setSelectedOwner(owners);
  };

  const deleteCat = (cats) => {
    fetch(url + "/cats" + cats._id, {
      method: "delete",
    }).then((response) => getCats());
  };

  return (
    <div className="App">
      <h1>Match Your Cat and Owner</h1>
      <Link to="/create">
        <button>Add Cat </button>
        <button>Add Owner</button>
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
                selectCat={selectCat}
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
