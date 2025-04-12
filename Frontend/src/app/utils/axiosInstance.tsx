import axios from "axios";
export const getAxiosInstace = () =>
  axios.create({
    baseURL: `${"must have the base url here once deployed"}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
