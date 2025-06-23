import React, { useEffect, useState } from 'react';
// import Table from 'react-bootstrap/Table.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Displaytodo.css";
// import { text } from 'express';

const Displaytodo = ({  fetchTodos }) => {

  const [todos, setTodos] = useState([]);

  useEffect(() => {

      const token = localStorage.getItem("token");
      fetch("http://localhost:5000/api/todo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }

      })
          .then((res) => res.json())
          .then((data) => {
              console.log("Fetched todos:", data);
              setTodos(data);
          })
          .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  //     useEffect(() => {
  //     const fetchTodos = async () => {
  //       try {
  //         const res = await fetch("http://localhost:5000/api/todo");
  //         const data = await res.json();
  //         console.log("Fetched todos:", data);
  //         setTodos(data);
  //       } catch (err) {
  //         console.error("Error fetching todos:", err);
  //       }
  //     };

  //     fetchTodos(); // run once on mount
  //   }, []);

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token"); // 🔐 get token

    try {
      const res = await fetch(`http://localhost:5000/api/todo/${id}`, {
        method: "DELETE",
        headers: {
        "Authorization": `Bearer ${token}` // ✅ add token
      }
      });
      //   console.log("Deleting ID:", id); // should log a number like 3, 4, etc.

      if (res.ok) {
        console.log(`Deleted todo with ID ${id}`);
        fetchTodos(); // Refresh list
      } else {
        console.error("Failed to delete todo");
      }
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const updateTodo = (id, currentTask) => {
      const token = localStorage.getItem("token"); // 🔐 get token
    const newTask = prompt("Add ur new task : ", currentTask)

    if (newTask) {
      fetch(`http://localhost:5000/api/todo/${id}`, {
        method: 'PUT',
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // ✅ add token
      },
        body: JSON.stringify({ text: newTask })
      })
        .then(res => res.text())
        .then(() => {
          // Refresh or re-fetch the todo list
          fetchTodos();
        })
    }
  }

  return (
    <div className='ALL'>
      <div className='display'>
        <h2>The current List of TODOs that is stored</h2>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Todo-name</th>
              {/* <th>isCompleted</th> */}
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(todos) ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Loading or invalid data...
                </td>
              </tr>
            ) : todos.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No TODOs found.
                </td>
              </tr>
            ) : (
              todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.text}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => updateTodo(todo.id, todo.text)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  )
}
// {/* <tbody>
//             {todos.length > 0 ? (
//               todos.map((todo) => (
//                 <tr key={todo.id}>
//                   <td>{todo.id}</td>
//                   <td>{todo.text}</td>
//                   {/* <td>{todo.isCompleted ? "✅ Completed" : "❌ Not Completed"}</td> */}
//                   <td><button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
//                   <td><button className="btn btn-danger btn-sm" onClick={() => updateTodo(todo.id, todo.text)}>Update</button></td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" style={{ textAlign: "center" }}>No TODOs found.</td>
//               </tr>
//             // )}
//           </tbody> */}

export default Displaytodo