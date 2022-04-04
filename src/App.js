import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import base from "./api/base";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Completed: task => task.fields.completed === "Completed",
  Ongoing: task => task.fields.completed === "Ongoing",
  "Not started": task => task.fields.completed === "Not started"
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    base('Tasks').select({view: 'Grid view',}).eachPage((records, fetchNextPage) => {
      setTasks(records);
      fetchNextPage();
    });

  });

  function addTask(name, desc, user, status) {
    const unique = "todo-" + nanoid();
    const notes = desc;
    base('Tasks').create([
      {
        "fields": {
          "name": name,
          "id": unique,
          "completed": status,
          "desc": notes,
          "user": user
        }
      }
    ], function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      prompt(record.getId());
    });
  };

  function deleteTask(id) {
    const removeTask = tasks.filter(task => id === task.fields.id);
    base('Tasks').destroy([removeTask[0].id], function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      prompt(record.getId());
    }
      )
  };

  function editTask(id, status) {
    const removeTask = tasks.filter(task => id === task.fields.id);
    base('Tasks').update([
      {
        "id": removeTask[0].id,
        "fields": {
          "completed": status
        }
      }
    ], function(err, record) {
        if (err) {
        console.error(err);
        return;
        }
        prompt(record.getId());
      }
    )
  }

  const filteredTasks = tasks.filter(FILTER_MAP[filter]);
  
  const taskList = filteredTasks.map(task => (
    <Todo
        id={task.fields.id}
        name={task.fields.name}
        completed={task.fields.completed}
        user={task.fields.user}
        key={task.fields.id}
        desc={task.fields.desc}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    )
  );

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
    key={name} 
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
    />
  ));
  
  return (
    <div className="todoapp">
      <h1>Task Manager</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
      {filterList}

      </div>
      <h2 id="list-heading">Task List</h2>
      <div>
        
      <ul
          role="list"
          className="todo-list stack-large stack-exception cards"
          aria-labelledby="list-heading"
          >
          {taskList}
          </ul>

      </div>
          
     
    </div>
  );
}

export default App;
