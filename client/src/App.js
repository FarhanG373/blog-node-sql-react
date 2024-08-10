import React,{useContext } from 'react';
import './App.scss';
import { Routes, Route } from "react-router-dom";
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Single from './Pages/Single';
import Write from './Pages/Write';
import {authContaxt} from './Contaxt/authContaxt';
function App() {
  const { currentUser } = useContext(authContaxt);
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/write" element={(currentUser !== null && currentUser !== undefined) ? <Write /> : <Login/>} />
        <Route exact path="/post/:id" element={(currentUser !== null && currentUser !== undefined) ? <Single /> : <Login/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
