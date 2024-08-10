import { db } from "../DB/db.js";
import bcrypt from "bcryptjs";

export const getAllPosts = (req, res) => {
  const c = req.query.cat;
  const qry = c
    ? `SELECT * FROM posts WHERE category=?`
    : `SELECT * FROM posts`;
  db.query(qry, [c], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ data: data, status: 200 });
  });
};
export const getPost = (req, res) => {
  const qr =
    "SELECT p.id, `username`, `title`, `dsc`, p.img, u.img AS userImg, `category`,`date` FROM user u JOIN posts p ON u.id = p.uid WHERE p.id = ?";
  db.query(qr, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const c = req.query.username;
  const qr = `SELECT id FROM user WHERE username=?`;
  db.query(qr, [c], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    const ins = `INSERT INTO posts (title, dsc, img,  category, date, uid) VALUES (?,?,?,?,?,?)`;
    const values = [
      req.body.title,
      req.body.value,
      req.body.img,
      req.body.cat,
      req.body.date,
      data[0].id,
    ];

    db.query(ins, values, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json({
        data: data,
        status: 200,
        message: "Post added successfully",
      });
    });
  });
};

export const deletePost = (req, res) => {
  const pId = req.params.id;
  const qry = `DELETE FROM posts WHERE id=?`;
  db.query(qry, [pId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Post deleted successfully" });
  });
};

export const updatePost = (req, res) => {
  const pId = req.params.id;
  const upd = `UPDATE posts SET title=?, dsc=?, img=?, category=? WHERE id=?`;
  const values = [
    req.body.title,
    req.body.value,
    req.body.img,
    req.body.cat,
    pId,
  ];
  db.query(upd, values, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res
      .status(200)
      .json({ data: data, status: 200, message: "Post updated successfully" });
  });
};
