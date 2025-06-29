import dotenv from 'dotenv';
dotenv.config();

// import mysql from 'mysql2';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import db from '../db.mjs'; // Note: include .js extension in ES modules
import db from '../db.mjs';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
console.log("✅ Auth routes file loaded"); 
// Ragiser Routes

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length > 0) return res.status(400).json({ error: "User already exists" });

        const hassPassword = await bcrypt.hash(password, 10);


        db.query("INSERT INTO users (name,email,password) VALUES  (?,?,?)",
            [name, email, hassPassword], (err, result) => {
                if (err) return res.status(500).json({ error: err });
                return res.status(201).json({ message: "User registered successfully" });
            })
    })
})


// Login Route

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length === 0) 
            return res.status(400).json({ error: "User not found. Please register first." });

        const user = result[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "Login successful", token });
    });

})

export default router;