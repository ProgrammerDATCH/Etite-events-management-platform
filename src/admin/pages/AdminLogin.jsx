import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminLoginAPI } from '../Api'
import { commonStyleClasses, isEmailValid } from '../../components/common'
import { FaSpinner } from 'react-icons/fa'
import { useAdminContext } from '../../AdminContextProvider';

export const AdminLogin = () => {
  const navigation = useNavigate();
  const { loginAdmin, logoutAdmin } = useAdminContext()
  const [err, setErr] = useState({ email: false, password: false })
  const [loggingIn, setLoggingIn] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const logout = urlParams.get('logout');
    if (logout === 'true') {
      document.cookie = 'adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      logoutAdmin()
      toast.success("ADMIN Logged out, successfully!")
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setErr({ email: false, password: false })
    if (loginData.email.trim().length == 0 || loginData.password.trim().length == 0) {
      if (loginData.email.trim().length == 0) {
        setErr((prevErr) => ({ ...prevErr, email: true }));
      }
      if (loginData.password.trim().length == 0) {
        setErr((prevErr) => ({ ...prevErr, password: true }));
      }
      toast.warn("Please fill all fields!")
      return;
    }
    if (!isEmailValid(loginData.email.trim())) {
      setErr((prevErr) => ({ ...prevErr, email: true }));
      toast.warn("Please enter a valid email address!");
      return;
    }
    if (loginData.password.trim().length < 6) {
      setErr((prevErr) => ({ ...prevErr, password: true }));
      toast.warn("Password must be at least 6 characters long!");
      return;
    }
    setLoggingIn(true)
    try {
      const { status, message } = await adminLoginAPI(loginData.email, loginData.password);
      if (status) {
        toast.success("ADMIN Login successful");
        const sixDaysInSeconds = 6 * 24 * 60 * 60;
        const expiryDate = new Date(Date.now() + sixDaysInSeconds * 1000).toUTCString();
        document.cookie = `adminToken=${message.token}; path=/; expires=${expiryDate}`;
        loginAdmin(message.admin)
        navigation('/admin');
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An error occurred while logging in.');
    } finally {
      setLoggingIn(false);
    }

  }


  return (
    <div className={commonStyleClasses("courses", null, true).parentDiv}>
      <h3 className='text-3xl mb-10 text-center'>ADMIN LOGIN</h3>
      <form onSubmit={handleLogin} className='flex flex-col justify-center items-center'>
        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) => { setLoginData({ ...loginData, email: e.target.value }); setErr((prevErr) => ({ ...prevErr, email: false })); }}
          className={`${commonStyleClasses(true, err.email).inputText}`}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }); setErr((prevErr) => ({ ...prevErr, password: false })); }}
          className={`${commonStyleClasses(true, err.password).inputText}`}
        />
        <button
          type="submit"
          className="mb-6 w-2/3 sm:w-1/3 cursor-pointer rounded-md border border-primary px-5 py-3 text-base font-medium  transition bg-textColor text-bgColor flex justify-center items-center"
        >
          {loggingIn && <span className='text-bgColor animate-spin text-2xl mr-1'><FaSpinner /></span>}
          {loggingIn ? "Signing In..." : "Sign In"}
        </button>

      </form>

    </div>
  )
}
