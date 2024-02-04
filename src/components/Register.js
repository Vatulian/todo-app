import React, { Component } from 'react'
import { useHistory } from "react-router-dom"
export default class Register extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          body: data,
        }).then(response => response.json()).then(json => {
          if(json.status === 200){
            window.location.href = '/sign-in'
          }
        }).catch(function(){
            document.getElementById("error").style.display = "block"
        });
      }

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
      <form onSubmit={this.handleSubmit}>
        <h3>Register</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="form-control"
            placeholder="First name"
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input id="lastName" name="lastName" type="text" className="form-control" placeholder="Last name" />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
            <h6 id="error" style={{display:"none", color:"red", textAlign:"center"}}>There is an account linked to this email.</h6>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>

      </form>
      </div>
      </div>
    )
  }
}