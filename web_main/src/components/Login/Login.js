import React, { useState } from 'react'
import { useHistory } from 'react-router';
// ** redux
import { updateLogin } from 'redux/actions/login';
import { useDispatch } from 'react-redux'

import './style.css'
export default function Login() {
  const dispatch = useDispatch()
  const history = useHistory();
  function handleSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    if (username == "P8" && password == "mta") {
      localStorage.setItem('login', true)
      dispatch(updateLogin(true))
      history.push('/');
    }
    else {
      alert("Login failed!");
    }
  }
  return (
    <div class="login">
      <div class="container">
        <h1>Login to access to<br />your account</h1>
        <div class="login-form">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" id="username" />
            <input type="password" placeholder="Password" id="password"/>
            <div class="remember-form">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <div class="forget-pass">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit">LOG-IN</button>
          </form>
        </div>
      </div>
    </div>
  )
}
