import React, { useEffect, useState , useContext } from 'react';
import logo from "../img/logo.png";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import * as jwtDecode from "jwt-decode";

// import { LoginContext } from '../context/LoginContext';

export default function Signup() {
  // const { setUserLogin} =useContext(LoginContext);
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //Toast function
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

  const postData = () => {
    // console.log({name ,username,email,  password })
    //Email validation
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    }
    else if (!passRegex.test(password)) {
      notifyA("Password must contain at least 8 characters , including at least 1 number and 1 includes both lowercase and uppercase letters and special characters for example #,!,$,?");
      return;
    }

    //sending data to server
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error);
        }

        else {
          notifyB(data.message);
          navigate("/login");
        }
        console.log(data);
      });
  }

  // const continueWithGoogle = (credentialResponse) => {
  //   console.log("Credential Response:", credentialResponse);
  
  //   if (!credentialResponse || !credentialResponse.credential) {
  //     console.error("Invalid credential response:", credentialResponse);
  //     notifyA("Invalid credential response.");
  //     return;
  //   }
  
  //   try {
  //     const jwtDetail = jwtDecode(credentialResponse.credential);
  //     console.log("Decoded JWT:", jwtDetail);
  
  //     fetch("/googleLogin", {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         name: jwtDetail.name,
  //         username: jwtDetail,
  //         email: jwtDetail.email,
  //         email_verified: jwtDetail.email_verified,
  //         clientId: credentialResponse.clientId,
  //         Photo: jwtDetail.picture
  //       })
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         if (data.error) {
  //           notifyA(data.error);
  //         } else {
  //           notifyB("Login successfully");
  //           console.log(data);
  //           localStorage.setItem("jwt", data.token);
  //           localStorage.setItem("user", JSON.stringify(data.user));
  //           setUserLogin(true);
  //           navigate("/");
  //         }
  //       })
  //       .catch(error => {
  //         console.error("Error during Google login fetch:", error);
  //         notifyA("An error occurred during Google login.");
  //       });
  //   } catch (error) {
  //     console.error("Error decoding JWT:", error);
  //     notifyA("An error occurred while decoding JWT.");
  //   }
  // };
  
  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          <img className="SignUpLogo" src={logo} alt="" />
          <p className="LoginPara">
            Sign up to see Photos and Videos <br />from your friends
          </p>
          <div>
            <input type="email" name="email" id="email" value={email} placeholder="E-mail" onChange={(e) => { setemail(e.target.value) }} />
          </div>
          <div>
            <input type="text" name="name" id="name" value={name} placeholder="Full Name" onChange={(e) => { setname(e.target.value) }} />
          </div>
          <div>
            <input type="text" name="uname" id="uname" value={username} placeholder="Username" onChange={(e) => { setusername(e.target.value) }} />
          </div>
          <div>
            <input type="password" name="password" id="password" value={password} placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} />
          </div>
          <p className="LoginPara" style={{ fontSize: "12px", margin: "3px 0px" }}>
            By signing up,you agree to out Terms,<br /> Privacy policy and Cookies policy.
          </p>
          <input type="submit" id="submit-btn" value="Sign Up" onClick={() => { postData() }} />
          {/* <GoogleLogin
            onSuccess={credentialResponse => {
              continueWithGoogle(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          /> */}
        </div>
        <div className="form2">
          Already have an account?
          <Link to="/Login">
            <span style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}>Log in</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
