import { apiInstance } from "./index.js";

const api = apiInstance();

async function getDealListByAgent(agentId, success, fail) {
  return await api
    .get(`http://localhost:9999/deal/list/agent/${agentId}`)
    .then(success)
    .catch(fail);
}

async function getDealListByHouse(aptCode, success, fail) {
  return await api
    .get(`http://localhost:9999/deal/list/house/${aptCode}`)
    .then(success)
    .catch(fail);
}

async function createDeal(deal, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return await api.post(`http://localhost:9999/deal/create`, deal).then(success).catch(fail);
}

async function getDeal(no, success, fail) {
  return await api.get(`http://localhost:9999/deal/${no}`, no).then(success).catch(fail);
}

async function deleteDeal(data, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return await api.delete(`http://localhost:9999/deal/${data.no}/${data.userId}`).then(success).catch(fail);
}

async function modifyDeal(data, success, fail) {
  return await api.put(`http://localhost:9999/deal/modify`, data).then(success).catch(fail);
}

function report(report, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return api.post(`http://localhost:9999/deal/report`, report).then(success).catch(fail);
}

export {
  getDealListByAgent,
  getDealListByHouse,
  createDeal,
  getDeal,
  report,
  deleteDeal,
  modifyDeal,
};
