import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:7000",
  // headers: {
  //   Accept: "application/json",
  //   "Access-Control-Allow-Origin": "*",
  //   "Content-Type": "application/json; charset=utf-8",
  // },
});

export const getTable = async (endpoint) => {
  return request.get(endpoint).then((res) => res.data);
};

export const addRow = async (endpoint, body) => {
  return request.post(endpoint, body).then((res) => res.data);
};

export const updateRow = async (endpoint, id, data) => {
  return request.put(`${endpoint}/${id}`, data).then((res) => res.data);
};

export const deleteRow = async (endpoint, id) => {
  return request.delete(`${endpoint}/${id}`).then((res) => res.data);
};

export const getChart = async (endpoint) => {
  return request.get(endpoint + "/chart").then((res) => res.data);
}
