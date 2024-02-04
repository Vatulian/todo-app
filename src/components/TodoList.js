import React from 'react';
import Todo from './Todo'
const TodoList = (props) =>{
    return(
        <div style={{padding:"0"}} className="todo-container">
        <ul className="todo-list">
            {props.filteredTodos.map(todo => (
                <Todo setTodos={props.setTodos} todos={props.todos} todo={todo} text={todo.text} key={todo.id} toDoList={props.toDoList}/>
            ))}
        </ul>
      </div>
    )
}

export default TodoList;