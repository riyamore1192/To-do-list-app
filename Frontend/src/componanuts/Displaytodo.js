

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Displaytodo.css";

const Displaytodo = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/todo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched todos:", data);
        setTodos(data);
      })
      .catch((err) => console.error("Error fetching todos:", err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5000/api/todo/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (res.ok) {
        console.log(`Deleted todo with ID ${id}`);
        fetchTodos(); // ✅ Refresh the list correctly
      } else {
        console.error("Failed to delete todo");
      }
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const updateTodo = (id, currentTask) => {
    const token = localStorage.getItem("token");
    const newTask = prompt("Add your new task:", currentTask);

    if (newTask) {
      fetch(`http://localhost:5000/api/todo/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ text: newTask })
      })
        .then(res => res.text())
        .then(() => {
          fetchTodos(); // ✅ Refresh list after update
        });
    }
  };

  return (
    <div className='ALL'>
      <div className='display'>
        <h2>The current List of TODOs that is stored</h2>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Todo-name</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(todos) ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>Loading or invalid data...</td>
              </tr>
            ) : todos.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No TODOs found.</td>
              </tr>
            ) : (
              todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.text}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </td>
                  <td>
                    <button className="btn btn-warning btn-sm" onClick={() => updateTodo(todo.id, todo.text)}>Update</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Displaytodo;
