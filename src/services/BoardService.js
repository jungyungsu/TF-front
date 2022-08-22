import http from "../http-common";

const getAll = () => {
  return http.get("/board");
};

const getBoard = (id) => {
  return http.get(`/board/${id}`);
};

const create = (data) => {
  return http.post("/board", data);
};

const get = (id) => {
  return http.get(`/board/${id}`);
};

const update = (id, data) => {
  return http.patch(`/board/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/board/${id}`);
};

const removeAll = () => {
  return http.delete(`/board`);
};

const BoardService = {
  getAll,
  getBoard,
  create,
  get,
  update,
  remove,
  removeAll,
};

export default BoardService;
