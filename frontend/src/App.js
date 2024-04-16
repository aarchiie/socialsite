import logo from './logo.svg';
import React,{createContext ,useState} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter,Routes , Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from './components/Login';
import Profile from "./components/Profile";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Createpost from './components/Createpost';
import { LoginContext } from './context/LoginContext';
import Modal from './components/Modal';
import UserProfie from './components/UserProfile';
import MyFolliwngPost from './components/MyFollowingPost';
// import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value={{setUserLogin , setModalOpen}}>
      <Navbar login ={userLogin}/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Signup" element={<Signup/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route exact path="/Profile" element={<Profile/>}></Route>
        <Route path="/Createpost" element={<Createpost/>}></Route>
        <Route path="/Profile/:userid" element={<UserProfie/>}></Route>
        <Route path="/followingpost" element={<MyFolliwngPost/>}></Route>
      </Routes>
      <ToastContainer theme='dark'/>
      
      {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
      </LoginContext.Provider>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
