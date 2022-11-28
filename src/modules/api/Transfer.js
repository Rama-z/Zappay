import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction`;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const transfer = (token, body) =>
  axios.post(`${baseUrl}/transfer`, body, config(token));
