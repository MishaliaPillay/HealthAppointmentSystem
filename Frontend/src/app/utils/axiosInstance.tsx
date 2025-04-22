import axios from "axios";
export const getAxiosInstace = () =>
  axios.create({
    baseURL: `${"https://healthappointmentsystem-2.onrender.com"}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
