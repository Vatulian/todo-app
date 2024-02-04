import React, {useEffect, useState} from "react";
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui';
import DatePicker from 'react-datepicker'

const Todo = (props) => {
    const [inputDate, setInputDate] = useState('\uf133')
    const [todo, setTodo] = useState(props.todo);
    
    useEffect(() => {
        if(props.todo.date !== null && props.todo.date !== ""){
            let a = props.todo.date.slice(0,10)
            let year = a.slice(0,4)
            let month = a.slice(5,7);
            let day = a.slice(8,11)
            let date = day + "-" + month + "-" + year
            setInputDate(date)
        }
    },[])

    useEffect(() => {
        props.setTodos(props.todos.map(t => {
            if(t.id === todo.id){
                return todo
                }
            return t;
        }))
    }, [todo])


    useEffect(() => {
    $("#date"+props.toDoList.id.toString()+props.todo.id.toString()).datepicker({
            minDate:0,
            dateFormat:"dd-mm-yy",
            showButtonPanel: true,
            closeText: "Clear/Cancel",
            onClose: function(dateText, obj ){
                console.log(props.todos)
                if ($(window.event.srcElement).hasClass('ui-datepicker-close')){
                    $("#date"+props.toDoList.id.toString()+props.todo.id.toString()).val('\uf133');
                    inputDateDeleteHandler($("#date"+(Math.floor(props.todo.id)).toString()).val(), props.todos)
                }
                else{
                    inputDateAddHandler($("#date"+props.toDoList.id.toString()+props.todo.id.toString()).val(), props.todos)
                }
            }
            
        })
    })

    const inputDateAddHandler = (e, todos) => {
        console.log(props.todos)
        if(e.length === 1)
            return
        fetch('http://localhost:3000/todo/date/', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
          }),
        body: JSON.stringify({userEmail: JSON.parse(localStorage.getItem("userEmail")), id: props.todo.id, toDoListid: props.toDoList.id, date: e}) 
    }).then(response => {
        let ok = true
        if(response.status !== 200){
            ok = false
            alert("An error occured while changing the date of the todo.")
        }
        if(ok === true){
            setInputDate(e);
            setTodo({...todo, date:e});
            // //            debugger;
            // // props.setTodos(todos.map(item => {
            // //     console.log(item);
            // //     if(item.id === props.todo.id){
            // //         return {
            // //             ...item, date:e
            // //         }
            // //     }
            //     return item;
            // }))
        }
    }).catch(function(){    

    });

    }
    const inputDateDeleteHandler = (e, todos) => {
        console.log(props.todos)
        fetch('http://localhost:3000/todo/date/', {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
              }),
            body: JSON.stringify({userEmail: JSON.parse(localStorage.getItem("userEmail")), id: props.todo.id, toDoListid: props.toDoList.id, date: ""}) 
        }).then(response => {
            let ok = true
            if(response.status !== 200){
                ok = false
                alert("An error occured while clearing the date of the todo.")
            }
            if(ok === true){
                setInputDate(e);
                setTodo({...todo, date:""});
                //debugger;
                // props.setTodos(todos.map(item => {
                //     if(item.id === props.todo.id){
                //         return {
                //             ...item, date:""
                //         }
                //     }
                //     return item;
                // }))
            }
        }).catch(function(){    
    
        });


    }

    const deleteHandler = () => {
        fetch('http://localhost:3000/todo/delete/', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
          }),
        body: JSON.stringify({userEmail: JSON.parse(localStorage.getItem("userEmail")), id: props.todo.id, toDoListid: props.toDoList.id}) 
    }).then(response => {
        let ok = true
        if(response.status !== 200){
            ok = false
            alert("An error occured while deleting the todo.")
        }
        if(ok === true){
            props.setTodos(props.todos.filter(el => el.id !== props.todo.id))
        }
    }).catch(function(){    

    });

        
  }
    const completeHandler = () => {
        fetch('http://localhost:3000/todo/complete/', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
          }),
        body: JSON.stringify({userEmail: JSON.parse(localStorage.getItem("userEmail")), id: props.todo.id, toDoListid: props.toDoList.id}) 
    }).then(response => {
        let ok = true
        if(response.status !== 200){
            ok = false
            alert("An error occured while completing/uncompleting the todo.")
        }
        if(ok === true){
            debugger;
            props.setTodos(props.todos.map(item => {
                if(item.id === props.todo.id){
                    return {
                        ...item, completed: !item.completed
                    }
                }
                return item;
            }))
        }
    }).catch(function(){    

    });
    }
    return(
        <div className="todo">
            <li className={`todo-item ${props.todo.completed ? "completed" : ""}`}>{props.text}</li>
            <button onClick={completeHandler} className={props.todo.completed? "uncomplete-btn" :"complete-btn"}><i className={`fas ${props.todo.completed? "fa-times" : "fa-check"}`}></i></button>
            <input value={inputDate} type="button" id={`date${props.toDoList.id.toString() + props.todo.id.toString()}`} className="calendar-btn"></input>
            <button onClick={deleteHandler} className="trash-btn"><i className="fas fa-trash"></i></button>
        </div>
    );

}

export default Todo;