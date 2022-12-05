import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`http://localhost:9999/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userId, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`http://localhost:9999/user/info/${userId}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  return await api.post(`http://localhost:9999/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  // api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`http://localhost:9999/user/logout/${userid}`).then(success).catch(fail);
}

async function join(user, success, fail) {
  await api.post(`http://localhost:9999/user/join`, JSON.stringify(user)).then(success).catch(fail);
}

async function updateUser(user, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.put(`http://localhost:9999/user/update`, JSON.stringify(user)).then(success).catch(fail);
}

async function findPass(userId, success, fail) {
  await api.get(`http://localhost:9999/user/findpassword/${userId}`).then(success).catch(fail);
}

async function getAgentInfo(userId, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`http://localhost:9999/user/mypage/${userId}`).then(success).catch(fail);
}

async function out(userId, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`http://localhost:9999/user/out/${userId}`).then(success).catch(fail);
}

export { join, login, findById, tokenRegeneration, logout, updateUser, findPass, getAgentInfo, out };
