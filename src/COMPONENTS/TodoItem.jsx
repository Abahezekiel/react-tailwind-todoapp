




import React from 'react';

const TodoItem = ({ singleTodo, toggleComplete, deleteTodo }) => {
  return (
    <li className="flex justify-between items-center mb-2 p-2 border-b border-gray-300">
      {/* Todo text with strikethrough if completed */}
      <span
        onClick={() => toggleComplete(singleTodo.id)}
        className={`cursor-pointer ${
          singleTodo.isComplete ? 'line-through text-gray-500' : 'text-black'
        }`}
      >
        {singleTodo.text}
      </span>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => toggleComplete(singleTodo.id)}
          className={`text-white bg-blue-500 px-2 py-1 rounded hover:bg-blue-600 ${
            singleTodo.isComplete ? '' : ''
          }`}
        >
          {singleTodo.isComplete ? "Uncomplete" : "Complete"}
        </button>
        <button
          onClick={() => deleteTodo(singleTodo.id)}
          className="text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

