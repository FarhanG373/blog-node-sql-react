import { db } from "../DB/db.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
  const { name, username, email } = req.body;

  const select = "SELECT * FROM user WHERE email = ? OR username = ?";

  // Check existing user
  db.query(select, [req.body.email, req.body.username], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res
        .status(409)
        .json({ status: 409, message: "Email or username already exists" });
    } else {
      // Encrypt password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      // const values = [req.body.name, req.body.username, req.body.email, hashedPassword];
      const insert = `INSERT INTO user (name, username, email, password) VALUES ("${name}","${username}","${email}","${hashedPassword}")`;
      if (!name || !username || !email || !hashedPassword) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      // Insert user
      db.query(
        insert,
        [name, username, email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json({ status: 200, message: "User registered successfully" });
        }
      );
    }
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM user WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({status:404, message:"No user available"});
    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)  return res.status(401).json({status:401, messsage:"Incorrect password"});
    res.status(200).json({status:200, result:data, messsage:"User login"});
  });
}

export const logout = (req, res) => {
  res.status(200).json("User has been logged out.")
};