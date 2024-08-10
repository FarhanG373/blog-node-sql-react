import React, { useState, useEffect } from "react";
import s from "./Pages.module.scss";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const cat = useLocation().search;

  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4040/api/posts${cat}`
        );
          setPosts(response.data.data);
          console.log(response.data.data[0].img);
          
      } catch (error) {
        setErr(error);
      }
    };
    data();
  }, [cat]);
  return (
    <div className={s.homePage}>
      <div className={s.container}>
        {
          posts.length !== 0 ? (<div className={s.posts}>
            {posts.map((item) => {
              const { id, title, dsc, img, category } = item;            
              return (
                <div className={s.postBlocks} key={id}>
                  <div className={s.postImage}>
                    <img src={`http://localhost:4040/api/upload/uploads/${img}`} alt={title} />
                  </div>
                  <div className={s.postDetails}>
                    <h2>{title}</h2>
                    <p>{dsc}</p>
                    <p>
                      <b>Category: </b>
                      {category}
                    </p>
                    <Link to={`/post/${id}`}>Read More</Link>
                  </div>
                </div>
              );
            })}
          </div>) 
          : 
          (<h3 style={{textAlign: 'center'}}>No post available</h3>)
        }
        
      </div>
    </div>
  );
};

export default Home;
