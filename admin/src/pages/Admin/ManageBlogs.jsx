import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogImg, setBlogImg] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Health & Wellness");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const { backendUrl, aToken } = useContext(AdminContext);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/blog/all-blogs");
      setBlogs(data.blogs);
    } catch (error) {
      toast.error("Error fetching blogs");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!blogImg && !editMode) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();
      if (blogImg) formData.append("image", blogImg);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("author", author);
      formData.append("category", category);

      let response;
      if (editMode) {
        response = await axios.put(
          backendUrl + `/api/blog/update-blog/${editId}`,
          formData,
          { headers: { aToken } }
        );
      } else {
        response = await axios.post(
          backendUrl + "/api/blog/add-blog",
          formData,
          { headers: { aToken } }
        );
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setTitle("");
        setDescription("");
        setContent("");
        setAuthor("");
        setCategory("Health & Wellness");
        setBlogImg(null);
        setEditMode(false);
        fetchBlogs();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (blog) => {
    setEditMode(true);
    setEditId(blog._id);
    setTitle(blog.title);
    setDescription(blog.description);
    setContent(blog.content);
    setAuthor(blog.author);
    setCategory(blog.category);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const { data } = await axios.delete(
          backendUrl + `/api/blog/delete-blog/${id}`,
          { headers: { aToken } }
        );
        if (data.success) {
          toast.success(data.message);
          fetchBlogs();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Error deleting blog");
      }
    }
  };

  return (
    
    <div className="m-5 w-full flex flex-col items-center h-[calc(100vh-64px)] overflow-y-auto">
      <p className="mb-3 text-lg font-medium">Manage Blogs</p>
      <div className="bg-white px-8 py-6 border rounded-lg shadow-md w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-600">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded px-3 py-2 focus:ring focus:ring-primary"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border rounded px-3 py-2 focus:ring focus:ring-primary"
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-3 py-2 focus:ring focus:ring-primary"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border rounded px-3 py-2 focus:ring focus:ring-primary"
              rows="4"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded px-3 py-2 focus:ring focus:ring-primary"
            >
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Medical News & Research">
                Medical News & Research
              </option>
              <option value="Nutrition & Diet">Nutrition & Diet</option>
              <option value="Disease Awareness & Prevention">
                Disease Awareness & Prevention
              </option>
              <option value="Mental Health">Mental Health</option>
            </select>
          </div>
          <div className="flex flex-col items-center">
            <label
              htmlFor="blog-img"
              className="cursor-pointer flex flex-col items-center"
            >
              <img
                className="w-16 h-16 bg-gray-200 rounded-full"
                src={
                  blogImg ? URL.createObjectURL(blogImg) : assets.upload_area
                }
                alt=""
              />
              <p className="text-sm text-gray-500">Upload Blog Image</p>
            </label>
            <input
              type="file"
              id="blog-img"
              hidden
              onChange={(e) => setBlogImg(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            className="bg-primary px-5 py-2 text-white rounded-full w-full"
          >
            {editMode ? "Update Blog" : "Add Blog"}
          </button>
        </form>
      </div>
      <div className="mt-8 w-full max-w-3xl">
        <p className="text-lg font-semibold mb-3">All Blogs</p>
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li
              key={blog._id}
              className="border p-4 rounded-lg flex justify-between items-center bg-white shadow-md"
            >
              <div>
                <p className="font-medium">{blog.title}</p>
                <p className="text-sm text-gray-500">
                  {blog.author} - {blog.category}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageBlogs;
