import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LogInModal from "../LogInModal/LogInModal";
import LogInForm from '../LogInForm/LogInForm';
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>React/Django JWT</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <LogInModal formID="login-form" type="Log in" openBtnVariant="outlined" form={<LogInForm/>}/>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
