import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const authContaxt = createContext();

export const AuthContaxtProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const login = async (data) => {
    const res = await axios.post(`http://localhost:4040/api/auth/login`, data);
    // Generate a random token for the user
    
    if(res.data.status === 200) {
      setCurrentUser({ username: res.data.result[0].username, password: res.data.result[0].password });  
      navigate("/");
    }
     
  };
  const logout = async () => {
    setCurrentUser(null);
    navigate("/login");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <authContaxt.Provider value={{ currentUser, logout, login }}>
      {children}
    </authContaxt.Provider>
  );
};
