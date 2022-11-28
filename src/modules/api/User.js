import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`;
const baseUrl2 = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllUser = (token, link) =>
  axios.get(`${baseUrl}${link}`, config(token));

export const getDetailUser = (token, id) =>
  axios.get(`${baseUrl}/profile/${id}`, config(token));

export const getDetailUser2 = (token, id) =>
  axios.get(`${baseUrl}/profile/${id}`, config(token));

export const getExpense = (token, id) =>
  axios.get(`${baseUrl2}/dashboard/${id}`, config(token));

export const getHistory = (token, link) =>
  axios.get(`${baseUrl2}/transaction/history${link}`, config(token));

export const checkPin = (pin, token) => {
  return axios.get(`${baseUrl}/pin/${pin}`, config(token));
};

export const editProfile = (token, id, body) =>
  axios.patch(`${baseUrl}/profile/${id}`, body, config(token));

export const editPhone = (token, id, body) =>
  axios.patch(`${baseUrl}/profile/${id}`, body, config(token));

export const editImage = (token, id, body) =>
  axios.patch(`${baseUrl}/image/${id}`, body, config(token));

export const editPin = (token, id, body) =>
  axios.patch(`${baseUrl}/pin/${id}`, body, config(token));

export const editPassword = (token, id, body) =>
  axios.patch(`${baseUrl}/password/${id}`, body, config(token));

export const deleteImage = (token, id) =>
  axios.delete(`${baseUrl}/image/${id}`, body, config(token));
