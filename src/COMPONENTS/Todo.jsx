


import React, { useState } from 'react';
import TodoList from './TodoList';

const Todo = () => {
  const [inputValue, setInputValue] = useState('');
  const [todo, setTodo] = useState([]);
  const [deletedTodos, setDeletedTodos] = useState([]); // State to store deleted todos
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Add a new todo
  const addTodo = () => {
    if (inputValue.trim()) {
      const isDuplicate = todo.some(
        (singleTodo) => singleTodo.text.toLowerCase() === inputValue.toLowerCase()
      );
      if (isDuplicate) {
        alert('This task already exists in your todo list!');
      } else {
        setTodo([...todo, { id: Date.now(), text: inputValue, isComplete: false }]);
        setInputValue('');
      }
    }
  };

  // Toggle complete status
  const toggleComplete = (id) => {
    setTodo(
      todo.map((singleTodo) =>
        singleTodo.id === id
          ? { ...singleTodo, isComplete: !singleTodo.isComplete }
          : singleTodo
      )
    );
  };

  // Delete a single todo
  const deleteTodo = (id) => {
    const deletedItem = todo.find((singleTodo) => singleTodo.id === id);
    if (deletedItem) {
      setDeletedTodos([...deletedTodos, deletedItem]);
    }
    setTodo(todo.filter((singleTodo) => singleTodo.id !== id));
  };

  // Clear all completed todos
  const clearComplete = () => {
    const completedTodos = todo.filter((singleTodo) => singleTodo.isComplete);
    setDeletedTodos([...deletedTodos, ...completedTodos]); // Add completed todos to deleted list
    setTodo(todo.filter((singleTodo) => !singleTodo.isComplete));
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Empty deleted todos
  const emptyDeletedTodos = () => {
    setDeletedTodos([]);
  };

  // Return a deleted todo to the main list
  const returnDeletedTodo = (id) => {
    const returnedTodo = deletedTodos.find((todo) => todo.id === id);
    if (returnedTodo) {
      setTodo([...todo, returnedTodo]);
      setDeletedTodos(deletedTodos.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div className="bg-sky-300 p-4 w-[60%] shadow-xl mx-auto border mt-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-5xl">TODO APP</h1>
        <span className="text-lg">
          Todos left: ({todo.filter((singleTodo) => !singleTodo.isComplete).length})
        </span>
      </div>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a todo"
          className="text-black w-[70%] p-2 border border-gray-300 rounded"
        />
        <button
          onClick={addTodo}
          className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Add Item
        </button>
      </div>
      <TodoList todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
      <div className="gap-2 flex justify-between">
        <button
          onClick={clearComplete}
          className="text-white bg-red-500 py-2 px-3 mt-4 hover:bg-red-600 rounded"
        >
          Clear Complete
        </button>
        <button
          onClick={toggleModal}
          className="text-white bg-blue-500 py-2 px-3 mt-4 hover:bg-blue-600 rounded"
        >
          Recently Deleted
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-[50%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl">Recently Deleted</h2>
              <button
                onClick={emptyDeletedTodos}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Empty
              </button>
            </div>
            {deletedTodos.length > 0 ? (
              <ul>
                {deletedTodos.map((deletedTodo) => (
                  <li
                    key={deletedTodo.id}
                    className="flex justify-between items-center p-2 border-b"
                  >
                    <span>{deletedTodo.text}</span>
                    <button
                      onClick={() => returnDeletedTodo(deletedTodo.id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Return
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tasks have been deleted yet.</p>
            )}
            <button
              onClick={toggleModal}
              className="text-white bg-gray-500 px-4 py-2 mt-4 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
