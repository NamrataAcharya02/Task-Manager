import React, { useState } from "react";

function Form(props) {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [user, setUser] = useState('');
    const [status, setStatus] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (name !== "" && status !== "" && user !== "") {
            console.log(name);
            props.addTask(name, desc, user, status);
            setName("");
            setDesc("");
            setUser("");
            setStatus("")
        }
        
      }
    function handleChange(e) {
        setName(e.target.value);
    }

    function handleDesc(e) {
        setDesc(e.target.value);
        console.log(desc);
    }

    function handleUser(e) {
        setUser(e.target.value);
        console.log(desc);
    }

    function handleStatus(e) {
        setStatus(e.target.value);
        console.log(e.target.value);
    }


  return (
    <form onSubmit={handleSubmit}>
        
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          Set your goal!
        </label>
      </h2>
      <div className="borderWrap">
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        type="text"
        id="new-todo-input"
        className="input inputx__lg"
        name="text"
        autoComplete="off"
        value={desc}
        onChange={handleDesc}
        placeholder="Notes"
      />
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={user}
        onChange={handleUser}
        placeholder="Assign to"
      />
      <div class="selector">
          <select class="selectpicker" onChange={handleStatus}  value={status}>
          <option value="" disabled selected>Select status</option>
            <option>Completed</option>
            <option>Ongoing</option>
            <option>Not started</option>
            </select> </div>
      </div>
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
