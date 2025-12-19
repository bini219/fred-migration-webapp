import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getLegacyClients() {
    return apiClient.get("/legacy/client");
  },

  getNewClients() {
    return apiClient.get("/new/client");
  },

  migrateClient(clientId) {
    return apiClient.post(`/migrate/${clientId}`);
  },
};
