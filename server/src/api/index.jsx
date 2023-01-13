import axios from 'axios';

// get all blogs
export const getAllBlogs = async (pageParam) => {
   const response = await axios.get(
      `http://localhost:3000/blogs?limit=10&page=${pageParam}`
   );
   return response.data;
};

// get blog by tagname
export const getBlogByTag = async (tagName) => {
   const response = await axios.get(
      `http://localhost:3000/blogs/tags/${tagName}`
   );

   return response.data;
};

// create a new blog
export const createBlog = (newBlog) =>
   axios.post('http://localhost:3000/blogs', newBlog);

// get single blog
export const getBlog = async (id) => {
   const response = await axios.get(`http://localhost:3000/blogs/${id}`);
   return response.data;
};

// update blog
export const updateBlog = (id, updateBlog) =>
   axios.patch(`http://localhost:3000/blogs/${id}`, updateBlog);

// delete blog
export const deleteBlog = (id) =>
   axios.delete(`http://localhost:3000/blogs/${id}`);

// <======================> user <======================>

// signup
export const signup = (userInfo) =>
   axios.post(`http://localhost:3000/signup`, userInfo);

// login
export const login = ({ email, password }) =>
   axios.post(`http://localhost:3000/login`, { email, password });
