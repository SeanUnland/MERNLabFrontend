import React from "react";

const Display = (props) => {
  const { cats } = props;

  const loaded = () => (
    <div style={{ textAlign: "center" }}>
      {cats.map((cats) => (
        <article>
          <img src={cats.img} alt="" />
          <h1>{cats.name}</h1>
          <h3>{cats.age}</h3>
          <button
            onClick={() => {
              props.selectCat(cats);
              props.history.push("/edit");
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              props.deleteCat(cats);
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

//   return (
//     <article>
//       <img src={cats.img} alt="" />
//       <h1>{cats.name}</h1>
//       <h3>{cats.age}</h3>
//       <button
//         onClick={() => {
//           props.selectCat(cats);
//           props.history.push("/edit");
//         }}
//       >
//         Edit
//       </button>
//       <button
//         onClick={() => {
//           props.deleteCat(cats);
//         }}
//       >
//         Delete
//       </button>
//     </article>
//   );

//   return cats > 0 ? loaded() : <h1>Loading...</h1>;
