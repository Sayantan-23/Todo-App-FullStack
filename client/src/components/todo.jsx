import { useState } from "react";
import todoIcon from "../../Images/Todo-Icon.png";
import { FaPlus } from "react-icons/fa";
import "../App.css";
import { FaTrashCan } from "react-icons/fa6";

function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);

  // Add Item
  const addItem = async () => {
    if (!inputData.trim()) {
      alert("Please write a todo");
    } else if (inputData.trim() !== "") {
      // Sending POST request to the server
      const response = await fetch("http://localhost:5000/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: inputData }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Updating the todo state
          setItems([...items, inputData]);
          setInputData("");
        }
      }
    }
  };

  // Delete Item
  const deleteItem = async (index) => {
    const response = await fetch(`http://localhost:5000/deleteTask/${index}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Updating the todo state
      const updatedTasks = [...items];
      updatedTasks.splice(index, 1);
      setItems(updatedTasks);
    }
  };

  // Delete All Item
  const removeAll = async () => {
    // Sending DELETE request to the server
    const response = await fetch("http://localhost:5000/deleteAllTasks", {
      method: "DELETE",
    });

    if (response.ok) {
      // Updating the todo state
      setItems([]);
    }
  };

  return (
    <>
      <div className="wrapper-container">
        <img src={todoIcon} alt="" className="todo-icon" />
        <h3 className="todo-heading">TODO</h3>
        <div className="add-item">
          <input
            type="text"
            placeholder="Add item..."
            value={inputData}
            onChange={(event) => setInputData(event.target.value)}
          />
          <button
            className="plus-icon-container"
            title="Add Todo"
            onClick={addItem}
          >
            <FaPlus className="plus-icon" size={30} />
          </button>
        </div>
        <div className="todo-list">
          <h2 className="list-heading">Todo List</h2>
          {items.map((element, index) => {
            return (
              <div className="item" key={index}>
                <p>{element}</p>
                <div className="list-icon-container">
                  <button
                    className="trash-icon-container"
                    title="Delete Todo"
                    onClick={() => deleteItem(index)}
                  >
                    <FaTrashCan className="icon-trash" size={25} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {items[0] ? (
          <button className="remove-btn btn" onClick={removeAll}>
            Delete All
          </button>
        ) : (
          <p className="empty">Empty List...</p>
        )}
      </div>
    </>
  );
}

export default Todo;
