import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-expense-tracker-api-p51v.onrender.com",
});

export default API;