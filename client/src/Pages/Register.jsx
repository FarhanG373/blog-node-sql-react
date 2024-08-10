import React, { useState } from "react";
import s from "./Pages.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    username: "",
    email: "",
    password: "",
  };
  const [data, setData] = useState(initialState);
  const [err, setError] = useState(null);

  const handleChange = (e) => {
    let val = e.target.value;
    setData((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4040/api/auth/register`,
        data
      );
      if (response.status === 200) {
        alert("User created");
        navigate("/login");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className={s.loginPage}>
      <div className={s.loginForm}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className={s.formRow}>
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              required
            />
          </div>
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
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className={s.formRow}>
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className={s.formRow}>
            <input type="submit" value={"Register"} />
          </div>
          {err ? <div className={s.errorRow}>{err}</div> : null}
        </form>
        <div className={s.already}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
