import axios from "../axios.js";

const API_URL = "/client";

//create client
const createClient = async (clientData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, clientData, config);

  return response.data;
};

//get all clients
const getAllClients = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

//get clients by page
const getPage = async (token, page, sortby) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    API_URL + "/page/" + page + "/sort/" + sortby,
    config
  );
  return response.data;
};

//delete client
const deleteClient = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + `/${id}`, config);

  return response.data;
};

//update client
const updateClient = async (id, clientData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + `/${id}`, clientData, config);

  return response.data;
};

const clientService = {
  createClient,
  getAllClients,
  getPage,
  deleteClient,
  updateClient,
};

export default clientService;
