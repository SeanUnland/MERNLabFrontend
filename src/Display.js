import React from "react";

const Display = (props) => {
  const { cats } = props;

  const loaded = () => (
    <div style={{ textAlign: "center" }}>
      {cats.map((cat) => (
        <article>
          <img src={cat.img} />
          <h1>{cat.name}</h1>
          <h3>{cat.age}</h3>
          <button
            onClick={() => {
              props.selectCat(cat);
              props.history.push("/edit");
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              props.deleteCat(cat);
            }}
          >
            Delete
          </button>
        </article>
      ))}
    </div>
  );
  return cats.length > 0 ? loaded() : <h1>Loading...</h1>;
};

export default Display;
