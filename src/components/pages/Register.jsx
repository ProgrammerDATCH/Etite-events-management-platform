import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {  registerAPI } from '../Api'
import { commonStyleClasses, isEmailValid, isStrongPassword, isValidPhoneNumber } from '../common'
import { FaSpinner } from 'react-icons/fa'

export const Register = () => {
  const navigation = useNavigate();
  const [err, setErr] = useState({ email: false, password: false })
  const [registeringIn, setRegisteringIn] = useState(false)
  const [registerData, setRegisterData] = useState({
    names: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  async function handleRegister(e) {
    e.preventDefault();
    setErr({ names: false, email: false, password: false, repeatPassword: false})
    if (registerData.names.trim().length == 0 || registerData.email.trim().length == 0 || registerData.password.trim().length == 0 || registerData.repeatPassword.trim().length == 0) {
      Object.keys(registerData).forEach((key) => {
        if (registerData[key].trim().length === 0) {
          setErr((prevErr) => ({ ...prevErr, [key]: true }));
        }
      });      
      toast.warn("Please fill all fields!")
      return;
    }
    if (!isEmailValid(registerData.email.trim())) {
      setErr((prevErr) => ({ ...prevErr, email: true }));
      toast.warn("Please enter a valid email address!");
      return;
    }
    if (registerData.password.trim() != registerData.repeatPassword.trim()) {
      setErr((prevErr) => ({ ...prevErr, repeatPassword: true }));
      toast.warn("Passwords do not matches!");
      return;
    }
    if (!isStrongPassword(registerData.password.trim())) {
      setErr((prevErr) => ({ ...prevErr, password: true, repeatPassword: true }));
      toast.warn("Password is weak!");
      return;
    }
    
    setRegisteringIn(true)
    const { status, message } = await registerAPI(registerData.names, registerData.email, registerData.password);
    if (status) {
      toast.success("Registered successfully!");
      navigation('/login');
    }
    else {
      toast.error(message);
    }
    setRegisteringIn(false)
  }
  return (
    <div className={commonStyleClasses("courses").parentDiv}>
      <h1 className='text-5xl mb-10 text-center'>Register</h1>
      <form onSubmit={handleRegister} className='flex flex-col justify-center items-center'>
        <input
          type="text"
          placeholder="Names"
          value={registerData.names}
          onChange={(e) => { setRegisterData({ ...registerData, names: e.target.value }); setErr((prevErr) => ({ ...prevErr, names: false })); }}
          className={`${commonStyleClasses(true, err.names).inputText}`}
        />
        <input
          type="email"
          placeholder="Email"
          value={registerData.email}
          onChange={(e) => { setRegisterData({ ...registerData, email: e.target.value }); setErr((prevErr) => ({ ...prevErr, email: false })); }}
          className={`${commonStyleClasses(true, err.email).inputText}`}
        />
        <input
          type="password"
          placeholder="Password"
          value={registerData.password}
          onChange={(e) => { setRegisterData({ ...registerData, password: e.target.value }); setErr((prevErr) => ({ ...prevErr, password: false })); }}
          className={`${commonStyleClasses(true, err.password).inputText}`}
        />
        <input
          type="password"
          placeholder="Repeat Password"
          value={registerData.repeatPassword}
          onChange={(e) => { setRegisterData({ ...registerData, repeatPassword: e.target.value }); setErr((prevErr) => ({ ...prevErr, repeatPassword: false })); }}
          className={`${commonStyleClasses(true, err.repeatPassword).inputText}`}
        />
        <button
          type="submit"
          className="mb-6 w-2/3 sm:w-1/3 cursor-pointer rounded-md border border-primary px-5 py-3 text-base font-medium transition bg-textColor text-bgColor flex justify-center items-center"
        >
          {registeringIn && <span className='text-bgColor animate-spin text-2xl mr-1'><FaSpinner /></span>}
          {registeringIn ? "Registering..." : "Register"}
        </button>

      </form>

      <p className="text-base text-body-color">
        <span className="pr-0.5">Already got account? </span>
        <Link
          to="/login"
          className="hover:underline text-blue-500"
        >
          Login
        </Link>
      </p>
    </div>
  )
}
