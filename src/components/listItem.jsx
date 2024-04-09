import React from "react";
import "./listitem.css";

export const ListItem = ({ item, onUpdateItem, onDeleteItem, onEdit }) => {
  const handleUpdateClick = () => {
    onEdit(item.id);
  };
  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      onDeleteItem(item.id);
    }
  };

  return (
    <div className="list-item">
      <input type="checkbox" checked={item.completed} readOnly />
      <span className={item.completed ? "completed" : ""}>{item.title}</span>
      <div className="btn">
        <button className="update-btn" onClick={handleUpdateClick}>
          Update
        </button>
        <button className="delete-btn" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};
