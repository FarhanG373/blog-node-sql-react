import React, { useState, useContext } from "react";
import s from "./Pages.module.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { authContaxt } from "../Contaxt/authContaxt";
const Write = () => {
  const { currentUser } = useContext(authContaxt);
  const state = useLocation().state;
  const navigate = useNavigate();
  const [value, setValue] = useState(state?.dsc || null); //this will be db filed - state?.dgfield
  const [title, setTitle] = useState(state?.title || null); //this will be db filed - state?.dgfield
  const [img, setImg] = useState(state?.img || null); //this will be db filed - state?.dgfield
  const [cat, setCategory] = useState(state?.category || null);  //this will be db filed - state?.dgfield
  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", img);
      const res = await axios.post(`http://localhost:4040/api/upload`,
        formData
      );
      return res.data;
    } catch (error) {}
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl =  await uploadImage(e);
    const localStorageUser = JSON.parse(
      localStorage.getItem("user", currentUser)
    );
    const username = localStorageUser.username;
    // send to server
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", value);
      formData.append("image", img);
      formData.append("category", cat);
      !state ? (await axios.post(`http://localhost:4040/api/posts?username=${username}`, {
        title,
        value,
        img:imgUrl,
        cat,
        date: moment(Date.now()).format('YYYY-MM-DD'),
      })) : (await axios.put(`http://localhost:4040/api/posts/${state.id}?username=${username}`, {
        title,
        value,
        img:imgUrl,
        cat,
      }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={s.writePage}>
      <div className={s.container}>
        <form onSubmit={handleSubmit}>
          <div className={s.left}>
            <div className={s.title}>
              <input
                type="text"
                id="title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
          </div>
          <div className={s.right}>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              name="file"
              onChange={(e) => setImg(e.target.files[0])}
            />
            <label
              htmlFor="file"
              style={{ marginBottom: ".5rem", display: "block" }}
            >
              Upload Image
            </label>
            <button>save as Draft</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="submit">Publish</button>
            <div className={s.category}>
              <h4>Category</h4>
              <div>
                <input
                  type="radio"
                  name="category"
                  id="category1"
                  onChange={(e) => setCategory(e.target.value)}
                  checked={cat === "art"}
                  value={`art`}
                />
                <label htmlFor="category1">art</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="category"
                  id="category2"
                  onChange={(e) => setCategory(e.target.value)}
                  checked={cat === "science"}
                  value={`science`}
                />
                <label htmlFor="category2">science</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="category"
                  id="category3"
                  onChange={(e) => setCategory(e.target.value)}
                  checked={cat === "technology"}
                  value={`technology`}
                />
                <label htmlFor="category3">technology</label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Write;
