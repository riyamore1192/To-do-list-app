
import express from "express";
const app = express();
import cors from "cors";
const PORT = 5000;
import db from "./db.mjs";
import verifytoken from "./Routes/Middleware/VerifyToken.mjs";
import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";
app.use(cookieParser());
import authRoutes from "./Routes/Auth.mjs"

app.use(cors());
app.use(express.json());

let todos = [];

// app.use('/api/auth');
app.use('/api/auth', authRoutes); // e.g., /api/auth/register


app.post('/api/todo', verifytoken, (req, res) => {

  console.log("POST /api/todos hit with data:", req.body);
  console.log("Incoming req.body:", req.body);

  const newTodo = {
    id: Date.now(),  // or use UUID
    text: req.body.text,
    isCompleted: req.body.isCompleted ?? false,
    user_id: req.user.id
  };

  console.log("Token OK, req.user:", req.user); // ✅ Must print user info
  // res.send("Authorized");

  const query = "INSERT INTO todos (id, text, isCompleted,user_id) VALUES (?,?,?,?)";
  const value = [newTodo.id, newTodo.text, newTodo.isCompleted,newTodo.user_id]

  db.query(query, value, (err, result) => {
    if (err) {
      console.error('Error inserting todo:', err);
      return res.status(500).send('Database error');
    }
    console.log('✅ Inserted:', result);
    return res.status(201).json(newTodo);
  })

  // todos.push(newTodo);

  // ✅ Log it for verification
  console.log("Todo added:", newTodo);
  console.log("Current todos array:", todos);
});

app.get('/api/todo', verifytoken,(req, res) => {
  const userId = req.user.id;

  const query = "SELECT * FROM todos WHERE user_id = ?";
  db.query(query,  [userId],(err, result) => {
    if (err) {
      console.log("Error is accuring in fethcing data from databse ", err);
     return res.status(500).json({ error: "Database error" }); // ✅ JSON respons

    }
    else {
      console.log('✅ Fetched todos:', result);
      res.json(result);
    }
  })
})

// app.get('/api/todo', (req, res) => {
//   const query = "SELECT * FROM todos";

//   db.query(query, (err, result) => {
//     if (err) {
//       console.log("Error is occurring in fetching data from database:", err);
//       return res.status(500).send('Database error');
//     }

//     // Convert isCompleted from 0/1 to boolean
//     const formatted = result.map(todo => ({
//       ...todo,
//       isCompleted: !!todo.isCompleted
//     }));

//     console.log('✅ Fetched todos (formatted):', formatted);
//     res.json(formatted);
//   });
// });

app.delete('/api/todo/:id', verifytoken, (req, res) => {
  const itemId = req.params.id;
  const userId = req.user.id;

  const query = 'DELETE FROM todos WHERE id = ? AND user_id = ?';
  db.query(query, [itemId, userId], (err, result) => {
    if (err) {
      console.error("Error deleting todo:", err);
      return res.status(500).send("Database error");
    }

    if (result.affectedRows === 0) {
      return res.status(403).send("Unauthorized: Cannot delete this todo");
    }

    console.log("✅ Deleted todo with ID:", itemId);
    res.status(200).send("Todo deleted");
  });
});


app.put('/api/todo/:id',verifytoken, async (req, res) => {
  const { id } = req.params;
  const { text } = req.body
  const userId = req.user.id;

  console.log("🔁 Updating todo:", { id, text, userId }); // ✅ Debug log

  try {
    await db.query('UPDATE todos SET text = ?  WHERE id = ? AND user_id = ? ',
      [text, id,userId]);
    res.status(200).send('Todo updated successfully');
  }
  catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).send('Error updating todo');
  }

});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

