// TodoList.jsx

import React, { useState, useEffect } from "react";
import { ListItem } from "./listItem";
import TodoModal from "./todoModal";
import "./listitem.css";

export const TodoList = () => {
  const [list, setList] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setList(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newTodo = {
      id: Math.random(),
      title: newTodoTitle,
      completed: false,
    };
    setList([...list, newTodo]);
    setNewTodoTitle("");
  };

  const handleUpdateItem = async (newTitle, newCompleted) => {
    const updatedList = list.map((item) => {
      if (item.id === selectedItem) {
        return { ...item, title: newTitle, completed: newCompleted };
      }
      return item;
    });
    setList(updatedList);
  };

  const handleDeleteItem = async (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (id) => {
    setSelectedItem(id);
    setIsModalOpen(true);
  };

  return (
    <div>
      <header>
        <h1>Todo List</h1>
      </header>
      <div className="form">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Enter new todo title"
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
      <div className="list">
        {list.map((item, index) => (
          <ListItem
            key={item.id}
            item={item}
            isNew={index === list.length - 1}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
            onEdit={handleEdit} // Pass handleEdit function
          />
        ))}
      </div>
      <TodoModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleUpdateItem}
        item={list.find((item) => item.id === selectedItem)}
      />
    </div>
  );
};
