import React, { useState, useContext } from "react";
import s from "./Pages.module.scss";
import { Link } from "react-router-dom";
import {authContaxt} from '../Contaxt/authContaxt'
const Login = () => {
  const {login} = useContext(authContaxt);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const handleChange = (e) => {
    let val = e.target.value;
    let nam = e.target.name;
    setData((prev) => ({ ...prev, [nam]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(data)
      
    } catch (error) {
      // The error is not an AxiosError
      if(error.response.data.status === 401) {
        setError("Invalid Password");
        return;
      } else if(error.response.data.status === 404){
        setError("No user available");
        return;
      }
    }
  };
  return (
    <div className={s.loginPage}>
      <div className={s.loginForm}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={s.formRow}>
            <label htmlFor="username">Username : </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div className={s.formRow}>
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              required
              name="password"
            />
          </div>
          <div className={s.formRow}>
            <input type="submit" value={"Login"} />
          </div>
          {err ? <div className={s.errorRow}>{err}</div> : null}
        </form>
        <div className={s.already}>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
