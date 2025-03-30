import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const SingleBlogPage = () => {
  const { id } = useParams();
  const { getBlogById } = useContext(AppContext);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        const blogData = await getBlogById(id);
        setBlog(blogData);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <h2 className="text-center text-gray-600">Loading...</h2>;

  return (
    <div className="max-w-4xl mx-auto my-16 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-2">By {blog.author}</p>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full max-h-[400px] object-cover rounded-lg"
      />

      <p className="text-gray-700 text-lg mb-4">{blog.description}</p>
      <div className="text-gray-800 text-base leading-relaxed">
        {blog.content}
      </div>
    </div>
  );
};

export default SingleBlogPage;
