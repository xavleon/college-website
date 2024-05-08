import { set } from "mongoose";
import React from "react";
import { useEffect, useState } from "react";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([null]);

  useEffect(() => {
    const myBlogs = async () => {
      try {
        const apiUrl =
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mrm.leon93";
        const response = await fetch(apiUrl);
        const data = await response.json();
        setUser(data.feed);
        setBlogs(data.items);
        console.log(data.feed.title);
      } catch (error) {
        console.log(error);
      }
    };
    myBlogs();
  }, []);

  if (user === null) {
    return <h1 style={{ color: "white" }}>Loading...</h1>;
  }

  return (
    <div className="user" style={{ color: "white" }}>
      test
      <div className="user">
        <img src={user.image} />
        <h1>{user.title}</h1>

        {blogs.map((blog) => {
          return (
            <div>
              <h1>{blog.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: blog.description }}></div>
              <a href={blog.link}>Read More</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPage;
