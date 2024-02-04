import React from 'react'


const Form = (props) => {
    const inputTextHandler = (e) => {
        props.setInputText(e.target.value);
    }
    const submitTodoHandler = (e) => {
        e.preventDefault();
        if(props.inputText === ""){
          alert("Invalid todo name.")
          return
      }
      fetch('http://localhost:3000/todo/add/', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
          }),
        body: JSON.stringify({userEmail: JSON.parse(localStorage.getItem("userEmail")), text: props.inputText, id: props.todos.length === 0 ? 0 : Math.max.apply(Math,props.todos.map(o => o.id)) + 1, completed:false, date:"", toDoListid: props.toDoList.id}) 
    }).then(response => {
        let ok = true
        if(response.status !== 200){
            ok = false
            alert("An error occured while adding the todo.")
        }
        if(ok === true){
          props.setTodos([
            ...props.todos, {
                text: props.inputText, completed: false, date: null, id:props.todos.length === 0 ? 0 : Math.max.apply(Math,props.todos.map(o => o.id)) + 1
    }])
        }
    }).catch(function(){    

    });

        props.setInputText("");
    }
        const statusHandler = (e) => {
        props.setStatus(e.target.value)
    }
    return(
<form style={{marginTop:"0"}} className='formClass'>
      <input style={{marginLeft:"1rem"}} value={props.inputText} onChange={inputTextHandler} type="text" className="todo-input formInput" />
      <button onClick={submitTodoHandler} className="todo-button formButton" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
    )
}
export default Form;