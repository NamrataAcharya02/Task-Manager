import React, { useState } from "react";
import './Todo.css';
import img from './user.png';

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newStatus, setnewStatus] = useState('');

  function handleChange(e) {
    setnewStatus(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newStatus);
    setnewStatus("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small cardBorder" onSubmit={handleSubmit}>
      <div className="form-group">
        <div class="selector">
          <label  id="new-todo-input"> Status </label>
          <div class="selector">
          <select class="selectpicker" onChange={handleChange}>
          <option value="" disabled selected>Select your option</option>
            <option>Completed</option>
            <option>Ongoing</option>
            <option>Not started</option>
            </select>
          </div>
           </div>
              </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit" >
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="cardBorder">
    <label className="title" htmlFor={props.id}>
      {props.name}
    </label> <br></br>
    <div className="userStatus">
      <button type="button" className="statusLabel" id={props.completed}>{props.completed} </button>
      <div className="userImg">
      <img src={img} className="image" alt="User"></img>
        <label className="todo-label" htmlFor={props.id}>
          {props.user} 
      </label> 
      </div>
      
    </div>
    <br></br>
    <label className="todo-label" htmlFor={props.id}>
      {props.desc}
    </label><br></br>
    <div className="btn-group">
      <button type="button" className="btn" onClick={() => setEditing(true)}>
        Edit <span className="visually-hidden">{props.name}</span>
      </button>
      <button type="button" className="btn btn__danger" 
      onClick={() => props.deleteTask(props.id)}>
        Delete <span className="visually-hidden">{props.name}</span>
      </button>
    </div>
  </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;

  }
  