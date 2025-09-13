import React from 'react'
import './login.css'

export default function Login() {
  return (
    <div className='login_box'>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form>
        <h3>Login Here</h3>

        <label htmlFor="emil">Email</label>
        <input type="text" placeholder="Enter your email" id="emil" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Enter your password" id="password" />

        <button type="submit">Log In</button>
      </form>
    </div>
  )
}
