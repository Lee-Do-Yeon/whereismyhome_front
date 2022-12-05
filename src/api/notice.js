import { apiInstance } from "./index.js";

const api = apiInstance();

async function postNOTICE(post, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return await api.post(`http://localhost:9999/notice/admin`, post).then(success).catch(fail);
}

async function deleteNOTICE(id, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.delete(`http://localhost:9999/notice/admin/${id}`).then(success).catch(fail);
}

async function editNOTICE(notice, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.put(`http://localhost:9999/notice/admin`, notice).then(success).catch(fail);
}

async function getNOTICELIST(success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return await api.get(`http://localhost:9999/notice/`).then(success).catch(fail);
}

async function getNOTICE(id, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return await api.get(`http://localhost:9999/notice/${id}`).then(success).catch(fail);
}

export { postNOTICE, deleteNOTICE, editNOTICE, getNOTICE, getNOTICELIST };
