import { useState, useEffect } from 'react';
import store from "./Redux/store.js"
import Todo from './componanuts/Todo.js';
import Displaytodo from './componanuts/Displaytodo.js';
import RootLayout from './componanuts/RootLayout.js';
import Login from './componanuts/Login.js';
import Register from './componanuts/Register.js';
import PrivateRoute from './componanuts/PrivateRoute.js';

import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';

const App = () => {

  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Using token:", token);


      const res = await fetch("http://localhost:5000/api/todo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }

      });
      const data = await res.json();
      console.log("Fetched from DB after add:", data); // ✅ Debug log
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos(); // fetch once on mount
  }, []);


  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />, // Navbar included here
      children: [
        { index: true, element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        {
          path: 'todos',
          element: (
            <PrivateRoute>
              <Todo  fetchTodos={fetchTodos}/>
            </PrivateRoute>
          ),
        },
        {
          path: 'displaydata',
          element: (
            <PrivateRoute>
              <Displaytodo todos={todos} fetchTodos={fetchTodos}  />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App;
