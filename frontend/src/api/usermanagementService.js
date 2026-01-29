import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/UserManagement`;

export const getUsers = (search = "") =>
  axios.get(`${API_URL}${search ? `?search=${search}` : ""}`);

export const getUser = (id) => axios.get(`${API_URL}/${id}`);

export const createUser = (user) => axios.post(API_URL, user);

export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);

export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
