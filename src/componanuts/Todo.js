import React, { useState } from "react";
import "./Todo.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa";
import { Add, remove, toggleComplete, updateTodo } from "./action";
import { useDispatch, useSelector } from "react-redux";

function Todo() {

    const [data, setData] = useState("") // foe add function

    const [filter, setFilter] = useState("ALL"); // ALL, ACTIVE, COMPLETED

    const dispatch = useDispatch();
    const user_data = useSelector((state) => state.a.user_data)

    function addData() {
        dispatch(Add(data))
        setData("")
        console.log("user_data:", user_data);
    }

    function removedata(id) {
        console.log("Removing item with id:", id);
        dispatch(remove(id))
    }

    const handleToggle = (k) => {
        dispatch(toggleComplete(k));  // Dispatch the toggle action
    };

    // const handleEditClick = (id, task) => {
    //     setEditId(id);
    //     setEditText(task);
    // };

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
                                        <li className={ele.completed ? 'completed' : ""}>{ele.task}</li>

                                    </div>
                                    <div className="buttons">
                                        <div className="update" onClick={() => handleEditClick(k, ele.task)}><FaEdit /></div>
                                        <div className="toggle" onClick={() => handleToggle(k)}>
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