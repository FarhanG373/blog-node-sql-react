import React, { useState, useEffect, useContext } from "react";
import s from "./Pages.module.scss";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { authContaxt } from "../Contaxt/authContaxt";

const Single = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(authContaxt);
  
  useEffect(() => {
    const getP = async () => {
      const res = await axios.get(`http://localhost:4040/api/posts/${id}`);
      setPost(res.data);
    };
    getP();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:4040/api/posts/${id}`
      );
      navigate('/');
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={s.container}>
      <div className={s.singlePage}>
        <div className={s.left}>
          <div className={s.singleImage}>
            <img src={`http://localhost:4040/api/upload/${post.img}`} alt={post.title} />
          </div>

          <div className={s.singleContent}>
            <h2 className={s.headings}>{post.title}</h2>
            <div className={s.postDate}>{moment(post.date).fromNow()}</div>
            <p>{post.dsc}</p>
          </div>
          <div className={s.userDetails}>
            <strong>{post.username}</strong>
            <br></br>
            {post.userImg && <img src={post.userImg} alt="" />}
            <span>Posted {moment(post.date).fromNow()}</span>
            {currentUser.username === post.username && (
            <>
              <Link to={`/write?edit=${id}`} state={post}>Edit</Link>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
          </div>
        </div>
        {/* <div className={styles.right}>
        <Menu />
      </div> */}
      </div>
    </div>
  );
};

export default Single;
