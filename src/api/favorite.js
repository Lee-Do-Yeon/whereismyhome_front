import { apiInstance } from "./index.js";

const api = apiInstance();

async function createFavorite(params, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return await api.post(`http://localhost:9999/favorite`, params).then(success).catch(fail);
}

async function getFavoriteList(userId, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return await api.get(`http://localhost:9999/favorite/${userId}`).then(success).catch(fail);
}

async function deleteFavorite(params, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return await api
    .delete(`http://localhost:9999/favorite/${params.userId}/${params.aptCode}`)
    .then(success)
    .catch(fail);
}

async function checkFavorite(params, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return await api
    .delete(`http://localhost:9999/favorite/${params.userId}/${params.aptCode}`)
    .then(success)
    .catch(fail);
}

async function countFavorite(aptCode, success, fail) {
  return await api.get(`http://localhost:9999/favorite/count/${aptCode}`).then(success).catch(fail);
}

export { createFavorite, getFavoriteList, deleteFavorite, checkFavorite, countFavorite };
