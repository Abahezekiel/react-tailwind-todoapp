import React from 'react'
import TodoItem from './TodoItem'
const TodoList = ({todo, toggleComplete, deleteTodo, clearComplete}) => {
  return (
    <div>
      <ul>
        {
          todo.map((singleTodo)=>(
            <TodoItem
            key={singleTodo.id}
            singleTodo={singleTodo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            clearComplete={clearComplete}
            />

          ))
        }
      </ul>
    </div>
  )
}

export default TodoList
