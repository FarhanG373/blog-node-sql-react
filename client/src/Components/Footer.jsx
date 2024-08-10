import React from 'react';
import s from "./Components.module.scss";
import Logo from "../logo.svg";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <img src={Logo} alt="" />
      <div>
        Made with ♥️ and <b>React.js</b>.
      </div>
    </footer>
  )
}

export default Footer