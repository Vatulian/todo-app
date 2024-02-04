import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Form from './Form';
import TodoList from './TodoList'
import TodoListForm from './TodoListForm'
import FormList from './FormList'
const Main = () => {
  const [inputText, setInputText] = useState("");
  const [todoLists, setTodoLists] = useState([])
  const [userToken, setUserToken] = useState();
   
  useEffect(() => {
    setUserToken(localStorage.getItem("token"))
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/todo/list/' + JSON.parse(localStorage.getItem("userEmail")), {
      method: 'GET',
      headers: new Headers({
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }),
  }).then(response => {
      console.log(response)
      if(response.status !== 200)
          alert("An error occured while getting the todo lists.")
      return response.json()
  }).then(json => {
    setTodoLists(json)
  }).catch(function(){    
  });
  }, [])

  useEffect(() => {

  }, [userToken])

  var currentDate = new Date();
  console.log((localStorage.getItem("expire") * 1000)- currentDate.getTime())
  setTimeout(() => {
    localStorage.clear("userEmail")
    localStorage.clear("expire")
    localStorage.clear("token")
    setUserToken()
  },(localStorage.getItem("expire") * 1000)-currentDate.getTime())

  const isAuth = localStorage.getItem("token");
  if(!isAuth || isAuth === null){
    return (
      <Navigate to="/sign-in"/>
    )
  }
    return (
        <>
       <header style={{fontSize:"3rem" ,minHeight:"10vh", marginTop:"3rem", marginBottom:"1rem"}}>Microservices Todo List</header>
        <FormList setTodoLists={setTodoLists} todoLists={todoLists} setInputText={setInputText} inputText={inputText}/>
       <div className="container-class">
        {todoLists.map(todoList => (
                <TodoListForm name={todoList.name} key={todoList.id} setTodoLists={setTodoLists} todoList={todoList} todoLists={todoLists}/>
            ))}
       </div>
        
        </>
    )
}
export default Main;