//components
import Navbar from "./components/Navbar"
import Sidebar from './components/Sidebar'

//pages
import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Clients from "./pages/clients"
import Reservations from "./pages/reservations"
import Calendar from "./pages/calendar"

//styles
import "antd/dist/antd.min.css"

//routing
import {
  Route,
  Routes
} from "react-router-dom";

//toastify (alerts)
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//antd components
import { Layout } from "antd"

import { useSelector } from "react-redux"

const { Sider, Content } = Layout



function App() {
  const { user } = useSelector( state => state.auth )
  return (
    <Layout style={{height: "100vh"}}>
      <Navbar />
      <Layout>
        {
          user ? (
            <Sider style={{background:"#fff"}}>
              <Sidebar />
            </Sider>
          ) : (<></>)
        }
        <Layout>
          <Content
            style={{
              margin: '24px 16px 0',
          }}>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/reservations" element={<Reservations />} />
                  <Route path="/calendar" element={<Calendar />} />
                </Routes>
              </div>
          </Content>
        </Layout>
      </Layout>
      
      <ToastContainer />
    </Layout>
  );
}

export default App;
