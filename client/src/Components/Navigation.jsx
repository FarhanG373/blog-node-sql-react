import React, { useContext } from "react";
import s from "./Components.module.scss";
import { Link } from "react-router-dom";
import Logo from "../logo.svg";
import { authContaxt } from "../Contaxt/authContaxt";
const Navigation = () => {
  const { currentUser, logout } = useContext(authContaxt);

  return (
    <nav className={s.navBar}>
      <div className={s.logo}>
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li><Link to="/?cat=art">Art</Link></li>
        <li><Link to="/?cat=science">Science</Link></li>
        <li><Link to="/?cat=technology">Technology</Link></li>
        {currentUser && <li>
          <Link to="/write">Write</Link>
        </li>
}
        {!currentUser && <li>
          <Link to="/register">Register</Link>
        </li>}
        {!currentUser ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
