import React, { useContext } from "react";
import logo from "../img/logo.png";
import './Navbar.css';
import { Link } from 'react-router-dom';
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ login }) {
    const navigate = useNavigate();
    const { setModalOpen } = useContext(LoginContext);
    const loginStuts = () => {
        const token = localStorage.getItem("jwt");
        if (login || token) {
            return [
                <>
                    <Link to="/Profile" className="button">
                        <li>Profile</li>
                    </Link>
                    <Link to="/Createpost" className="button">
                        <li>Createpost</li>
                    </Link>
                    <Link to="/followingpost" className="button">
                        <li>Following Posts</li>
                    </Link>
                    <Link to={""} className="button" style={{ backgroundColor: 'red' }} onClick={() => setModalOpen(true)}>
                        <li>Log Out</li>
                    </Link>
                </>
            ]
        }
        else {
            return [
                <>
                    <Link to="/Signup" className="button">
                        <li>Sign up</li>
                    </Link>
                    <Link to="/Login" className="button">
                        <li>Log in</li>
                    </Link>
                </>
            ]
        }
    };

    const loginStutsMObile = () => {
        const token = localStorage.getItem("jwt");
        if (login || token) {
            return [
                <>
                    <Link to="/" >
                        <li><span class="material-symbols-outlined">
                            home_app_logo
                        </span></li>
                    </Link>
                    <Link to="/Profile" >
                        <li><span class="material-symbols-outlined">
                            account_circle
                        </span></li>
                    </Link>
                    <Link to="/Createpost" >
                        <li><span class="material-symbols-outlined">
                            add_box
                        </span></li>
                    </Link>
                    <Link to="/followingpost" >
                        <li><span class="material-symbols-outlined">
                            explore
                        </span></li>
                    </Link>
                    <Link to={""}  onClick={() => setModalOpen(true)}>
                        <li><span class="material-symbols-outlined">
                            logout
                        </span></li>
                    </Link>
                </>
            ]
        }
        else {
            return [
                <>
                    <Link to="/Signup" className="button">
                        <li>Sign up</li>
                    </Link>
                    <Link to="/Login" className="button">
                        <li>Log in</li>
                    </Link>
                </>
            ]
        }
    };

    return (
        <div className="navbar" >
            <img id="hw-logo" src={logo} alt="" onClick={() => {
                navigate("/")
            }} />
            <ul className="nav-menu">
                {loginStuts()}
            </ul>
            <ul className="nav-mobile"  >
                {loginStutsMObile()}
            </ul>
        </div>
    );
}   