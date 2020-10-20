import React from "react";

const Form = (props) => {
  const [formData, setFormData] = React.useState(props.cat);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(formData);
    props.history.push("/");
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="img"
          value={formData.img}
          onChange={handleChange}
        />
        <input type="submit" value={props.label} />
      </form>
    </div>
  );
};

export default Form;
