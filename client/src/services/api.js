import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-expense-tracker-api-p51v.onrender.com/api",
});

export default API;