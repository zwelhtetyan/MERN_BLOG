import axios from 'axios';

// get all blogs
export const getAllBlogs = async (pageParam) => {
  const response = await axios.get(
    `https://bmern.onrender.com/blogs?limit=10&page=${pageParam}`
  );
  return response.data;
};

// get blog by tagname
export const getBlogByTag = async (tagName) => {
  const response = await axios.get(
    `https://bmern.onrender.com/blogs/tags/${tagName}`
  );

  return response.data;
};

// create a new blog
export const createBlog = (newBlog) =>
  axios.post('https://bmern.onrender.com/blogs', newBlog);

// get single blog
export const getBlog = async (id) => {
  const response = await axios.get(`https://bmern.onrender.com/blogs/${id}`);
  return response.data;
};

// update blog
export const updateBlog = (id, updateBlog) =>
  axios.patch(`https://bmern.onrender.com/blogs/${id}`, updateBlog);

// delete blog
export const deleteBlog = (id) =>
  axios.delete(`https://bmern.onrender.com/blogs/${id}`);

// <======================> user <======================>

// signup
export const signup = (userInfo) =>
  axios.post(`https://bmern.onrender.com/signup`, userInfo);

// login
export const login = ({ email, password }) =>
  axios.post(`https://bmern.onrender.com/login`, { email, password });
