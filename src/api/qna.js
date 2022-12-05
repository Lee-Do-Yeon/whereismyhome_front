import { apiInstance } from "./index.js";

const api = apiInstance();

async function postQNA(post, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return await api.post(`http://localhost:9999/qna/post`, post).then(success).catch(fail);
}

// async function postReply(post, success, fail) {
//   // 나중에 엔드포인트 바꾸기
//   api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
//   return await api.post(`http://localhost:9999/qna/post`, post).then(success).catch(fail);
// }

async function deleteQNA(id, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.delete(`http://localhost:9999/qna/post/${id}`).then(success).catch(fail);
}

async function editQNA(post, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.put(`http://localhost:9999/qna/post`, post).then(success).catch(fail);
}

async function getQNAs(success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return await api.get(`http://localhost:9999/qna/post`).then(success).catch(fail);
}

async function getQNA(id, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return await api.get(`http://localhost:9999/qna/post/${id}`).then(success).catch(fail);
}

async function getREPLIEs(id, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return await api.get(`http://localhost:9999/qna/reply/${id}`).then(success).catch(fail);
}

async function replyCheck(id, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return await api.get(`http://localhost:9999/qna/replyCheck/${id}`).then(success).catch(fail);
}

export { postQNA, deleteQNA, editQNA, getQNAs, getQNA, getREPLIEs, replyCheck };
