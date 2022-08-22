import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:18081/api",
  headers: {
    "Content-type": "application/json",
  },
});
