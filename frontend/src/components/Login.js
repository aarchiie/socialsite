import React,{useState , useContext} from 'react';
import "./Login.css";
import logo from "../img/logo.png";
import {Link,useNavigate} from "react-router-dom";
import { toast} from 'react-toastify';
import { LoginContext } from '../context/LoginContext';

export default function Login() {
  const {setUserLogin}=useContext(LoginContext);
  const navigate=useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //Toast function
  const notifyA=(msg)=>toast.error(msg)
  const notifyB=(msg)=>toast.success(msg)

  const emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData=()=>{
    // console.log({email,  password })

    //Email validation
    if(!emailRegex.test(email))
    {
      notifyA("Invalid email");
      return;
    }

    //sending data to server
    fetch("/login" ,{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({     //name->key(constant) : name->value(change)
        email:email,
        password:password
      })
    })
    .then(res=>res.json())
    .then(data =>{
      if(data.error)
      {
        notifyA(data.error);
      }
      else
      {
        notifyB("Login succesfully");
        console.log(data)
        localStorage.setItem("jwt" , data.token)
        localStorage.setItem("user" , JSON.stringify(data.user))
        setUserLogin(true)
        navigate("/")
      }
      console.log(data);
    })
  }


  return (
    <div className="LogIn">
      <div>
        <div className="LogInForm">
        <img className="LogInLogo" src={logo} alt="" />
        <div>
        <input type="email" name="email" id="email" value={email} placeholder="E-mail" onChange={(e)=>{setemail(e.target.value)}}/>
        </div>
        <div>
        <input type="password" name="password" id="password" value={password} placeholder="Password" onChange={(e)=>{setpassword(e.target.value)}}/>
        </div>
        <input type="submit" id="LogIn-btn" onClick={()=>{postData()}} value="Log in"/>
        </div>
        <div className="LogInForm2">
            Don't have an account?   
          <Link to="/Signup">
          <span style={{color:"blue" , cursor:"pointer" ,textDecoration:"underline"}}>Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
