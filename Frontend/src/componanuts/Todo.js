import React, { useState, useEffect } from "react";
import "./Todo.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa";
import { Add, remove, updateTodo, toggleComplete } from "../Redux/action.js";
import { useDispatch, useSelector } from "react-redux";
// import { text } from "express";

function Todo({ fetchTodos }) {

    useEffect(() => {
     
   
    }, [])
 
    const [data, setData] = useState("") // foe add function

    const [filter, setFilter] = useState("ALL"); // ALL, ACTIVE, COMPLETED

    const dispatch = useDispatch();
    const user_data = useSelector((state) => state.a.user_data)

    const token = localStorage.getItem("token"); // or wherever you store it
    console.log("Token being sent:", token);


    // updated add to do fuction
    async function addData() {
        if (!data.trim()) return; // Prevent adding empty items

        const token = localStorage.getItem("token"); // or however you're storing it
    if (!token) {
        console.error("No token found — user may not be authenticated");
        return;
    }

        try {
            const response = await fetch("http://localhost:5000/api/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}` // 🔐 Send the token here
                },
                //  credentials: "include", // <--- important
                body: JSON.stringify({ text: data }) // adjust depending on your backend schema
            });

            if (!response.ok) {
                throw new Error("Failed to add data to backend");
            }

            const savedTodo = await response.json();
            console.log("Saved:", savedTodo);
            dispatch(Add(savedTodo)); // dispatch with the saved todo (e.g., with id)
            setData(""); // clear input
            await fetchTodos();    // 🔄 update UI with fresh data
            // console.log("user_data:", user_data);
        } catch (error) {
            console.error("Error adding data:", error);
        }
    }

    function removedata(id) {
        console.log("Removing item with id:", id);
        dispatch(remove(id))
    }

    const handleToggle = (k) => {
        dispatch(toggleComplete(k));  // Dispatch the toggle action
    };


    const handleEditClick = (id, oldTask) => {
        const updatedText = window.prompt("Update your task:", oldTask);
        if (updatedText !== null && updatedText.trim() !== "") {
            dispatch(updateTodo(id, updatedText));
        }
    };

    const filteredData = user_data.filter((item) => {
        if (filter === "ALL") return true;
        if (filter === "ACTIVE") return !item.completed;
        if (filter === "COMPLETED") return item.completed;
        return true;
    });

    // console.log("ele:", ele);


    return (
        <div className="container">
            <h1>TO DO LIST APPLICATION</h1>
            <div className="content">
                <input type="text" name="task" value={data} onChange={(e) => setData(e.target.value)} />
                <button className="ADD" onClick={() => addData()}>ADD</button>

                {/* Filter Buttons */}
                <div className="filters">
                    <button onClick={() => setFilter("ALL")}
                        className={filter === "ALL" ? "filter-btn active" : "filter-btn"}>All</button>
                    <button onClick={() => setFilter("ACTIVE")}
                        className={filter === "ALL" ? "filter-btn active" : "filter-btn"}>Uncompleted</button>
                    <button onClick={() => setFilter("COMPLETED")}
                        className={filter === "ALL" ? "filter-btn active" : "filter-btn"}>Completed</button>
                </div>


                <div className="kk">
                    <div className="todo-container" >{
                        filteredData.map((ele, k) => {
                            return (
                                <div className="list">
                                    <div className="data" key={k}>
                                        <li>{k + 1} .</li>
                                        <li className={ele.completed ? 'completed' : ""}>{ele.text}</li>

                                    </div>
                                    <div className="buttons">
                                        <div className="update" onClick={() => handleEditClick(ele._id, ele.text)}><FaEdit /></div>
                                        <div className="toggle" onClick={() => handleToggle(ele._id)}>
                                            {ele.completed ? <FaToggleOn /> : <FaToggleOff />} </div>
                                        <div className="del" onClick={() => removedata(k)}><MdDelete /></div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    </div>

                </div>
            </div>

        </div>
    )
}


export default Todo;

// function addData() {
//     dispatch(Add(data))
//     setData("")
//     console.log("user_data:", user_data);
// }
