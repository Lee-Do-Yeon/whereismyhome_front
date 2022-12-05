import axios from "axios";
/*
BACK_BASE_URL=http://localhost:9999
*/
// local vue api axios instance
// house deal API axios instance

function apiInstance() {
  const instance = axios.create({
    baseURL: process.env.BACK_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { apiInstance };
