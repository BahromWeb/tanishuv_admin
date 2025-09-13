import React, { useState } from 'react'
import './login.css'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { api } from '../host/Host'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginFunc = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${api}/login`, { email, password })
      console.log("Response:", res.data)
    } catch (err) {
      console.error("Error:", err)
    }
  }

  return (
    <div className='login_box'>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <Form onSubmit={loginFunc}>
        <h3>Admin panel</h3>

        <label htmlFor="email">Email</label>
        <Form.Control
          id="email"
          autoComplete="new-password"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="text"
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <Form.Control
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="Enter your password"
        />

        <Button type="submit">Log In</Button>
      </Form>
    </div>
  )
}
