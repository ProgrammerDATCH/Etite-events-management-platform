import { Admin } from "./Admin"
import { User } from "./User"
import { Dashboard } from "./admin/Dashboard"
import { Home } from "./components/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Events } from "./components/pages/Events"
import { Login } from "./components/pages/Login"
import { Register } from "./components/pages/Register"
import { Account } from "./components/pages/Account"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { disableDevTools } from "./components/common"
import { isMobile } from 'react-device-detect'
import Page404 from "./components/pages/Page404"
import { AdminLogin } from "./admin/pages/AdminLogin"
import { AddUsers } from "./admin/pages/AddUsers"
import { ManageEvents } from "./admin/pages/ManageEvents"
import { ManageTickets } from "./admin/pages/ManageTickets"
import { AllUsers } from "./admin/pages/AllUsers"
import AdminAuth from "./admin/adminComponents/common/AdminAuth"
import { EventUpdate } from "./admin/pages/EventUpdate"

function App() {
  // useEffect(()=>{disableDevTools()}, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="events" element={<Events />} />
          <Route path="account" element={<Account />} />
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="" element={<AdminAuth><Dashboard /></AdminAuth>} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="users" element={<AdminAuth><AllUsers /></AdminAuth>} />
          <Route path="addUser" element={<AdminAuth><AddUsers /></AdminAuth>} />
          <Route path="events" element={<AdminAuth><ManageEvents /></AdminAuth>} />
          <Route path="tickets/:eventId" element={<AdminAuth><ManageTickets /></AdminAuth>} />
          <Route path="events/update/:eventId" element={<AdminAuth><EventUpdate /></AdminAuth>} />
        </Route>

      </Routes>
      <ToastContainer position="bottom-right" limit={isMobile ? 3 : 5} />
    </BrowserRouter>
  )
}

export default App
