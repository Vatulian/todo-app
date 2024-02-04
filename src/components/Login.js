import React, { Component } from 'react';
//import jwtDecode from 'jwt-decode';

export default class Login extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const { jwtDecode } = require('jwt-decode');

    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        console.log(json.jwtToken);
        let decodedToken = jwtDecode(json.jwtToken);
        localStorage.setItem('userEmail', JSON.stringify(decodedToken.sub));
        localStorage.setItem('expire', JSON.stringify(decodedToken.exp));
        localStorage.setItem('token', json.jwtToken);

        window.location.href = '/main';
      })
      .catch(function () {
        localStorage.removeItem('token');
        document.getElementById('error').style.display = 'block';
      });
  }

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.handleSubmit}>
            <h3>Sign In</h3>
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
              <h6
                id="error"
                style={{ display: 'none', color: 'red', textAlign: 'center' }}
              >
                Invalid email or password.
              </h6>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

