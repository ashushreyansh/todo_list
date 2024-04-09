import React, { useState, useEffect } from "react";
import "./listitem.css";

const TodoModal = ({ isOpen, onClose, onSubmit, item }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newCompleted, setNewCompleted] = useState(false);

  useEffect(() => {
    if (item) {
      setNewTitle(item.title);
      setNewCompleted(item.completed);
    }
  }, [item]);

  const handleSubmit = () => {
    onSubmit(newTitle, newCompleted);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Edit Todo</h2>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <label>
          Completed:
          <input
            type="checkbox"
            checked={newCompleted}
            onChange={(e) => setNewCompleted(e.target.checked)}
          />
        </label>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TodoModal;
