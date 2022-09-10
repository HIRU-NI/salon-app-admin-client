//components
import Navbar from "./components/Navbar"

//pages
import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/signup"

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


function App() {
  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
