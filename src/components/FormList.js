import React from 'react'


const FormList = (props) => {
    const inputTextHandler = (e) => {
        props.setInputText(e.target.value);
    }
    const submitListHandler = (e) => {
        let IDValue = props.todoLists.length === 0 ? 0 : Math.max.apply(Math,props.todoLists.map(o => o.id)) + 1
        console.log(IDValue)
        fetch('http://localhost:3000/todo/user/', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
          }),
        body: JSON.stringify({userEmail: JSON.parse(localStorage.getItem("userEmail")), name: props.inputText, id: IDValue }) 
    }).then(response => {
        let ok = true
        if(response.status !== 200){
            ok = false
            alert("An error occured while creating the todo list.")
        }
        if(ok === true){
            props.setTodoLists([
                ...props.todoLists, {
                    name: props.inputText, toDos:[], id: IDValue
                }
            ])
        }
    }).catch(function(){    
        // localStorage.setItem("auth", false);
        // document.getElementById("error").style.display = "block"
    });
        e.preventDefault();
        if(props.inputText === ""){
            alert("Invalid todo list name.")
            return
        }

        props.setInputText("");
    }
    return(
        <>        
                <h1 className="formClass" style={{minHeight:"0", marginBottom:"0",marginTop:"1.75rem", paddingLeft:"0.75rem"}}>Todo List Name</h1>
        <form style={{marginTop:"0.50rem", transform:"scale(1.25)"}} className='formClass'>
                <input style={{marginLeft:"1rem",flexDirection:"column"}} value={props.inputText} onChange={inputTextHandler} type="text" className="todo-input formInput" name="todoList" />
        <button onClick={submitListHandler} className="todo-button formButton" type="submit">
  <i className="fas fa-plus-square"></i>
</button>
</form>
        </>
    )
}
export default FormList;