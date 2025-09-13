// import React, { useState } from 'react'
// import './login.css'
// import { Button, Form } from 'react-bootstrap'
// import axios from 'axios'
// import Cookies from 'js-cookie'   

// import { api } from '../host/Host'

// export default function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const loginFunc = async (e) => {
//     e.preventDefault()
//     try {
//       var res = await axios.post(`${api}/login/`, { email, password })
//       Cookies.set('token_access', res.data.access, { expires: 1 / 8 })
//       Cookies.set('token_refresh', res.data.refresh, { expires: 1 / 8 })
//     } catch (err) {
//       console.error("Login error:", err)
//     }
//   }

//   return (
//     <div className='login_box'>
//       <div className="background">
//         <div className="shape"></div>
//         <div className="shape"></div>
//       </div>

//       <Form onSubmit={loginFunc}>
//         <h3>Admin panel</h3>

//         <label htmlFor="email">Email</label>
//         <Form.Control id="email" autoComplete="new-password" value={email} onChange={(e) => setEmail(e.target.value)} required type="text" placeholder="Enter your email"/>

//         <label htmlFor="password">Password</label>
//         <Form.Control id="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Enter your password"/>

//         <Button type="submit">Log In</Button>
//       </Form>
//     </div>
//   )
// }


import React, { useState } from 'react'
import './login.css'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Cookies from 'js-cookie'   

import { api } from '../host/Host'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ email: false, password: false })
  const [loading, setLoading] = useState(false)

  const loginFunc = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({ email: false, password: false })
    
    try {
      var res = await axios.post(`${api}/login/`, { email, password })
      Cookies.set('token_access', res.data.access, { expires: 1 / 8 })
      Cookies.set('token_refresh', res.data.refresh, { expires: 1 / 8 })
      
    } catch (err) {
      console.error("Login error:", err)
    
      if (err.response?.status === 401 || err.response?.status === 400) {
        setErrors({ email: true, password: true })
      }
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='login_box'>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <Form onSubmit={loginFunc}>
        <h3>Admin Panel</h3>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <div className="input-wrapper">
            <Form.Control 
              id="email" 
              autoComplete="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              type="email" 
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            <div className="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <Form.Control 
              id="password" 
              autoComplete="current-password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
            />
            <div className="input-icon password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2.73 16.39 1 12A18.45 18.45 0 0 1 5.06 5.06L17.94 17.94Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4C17 4 21.27 7.61 23 12A18.5 18.5 0 0 1 19.42 16.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L2 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
            </div>
          </div>
        </div>

        <Button type="submit" disabled={loading} className="login-btn">
          {loading ? (
            <>
              <div className="spinner"></div>
              Logging in...
            </>
          ) : (
            'Log In'
          )}
        </Button>

        {(errors.email || errors.password) && (
          <div className="error-message">
            Invalid email or password. Please try again.
          </div>
        )}
      </Form>
    </div>
  )
}