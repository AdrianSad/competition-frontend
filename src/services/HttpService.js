import axios from "axios";
import { USER_LOGIN, USER_REGISTER } from "../const/endpoints";

const baseURL = "http://localhost:3000";

class HttpService {
  constructor() {
    this.axios = axios.create({ baseURL });
  }

  registerUser = (email, username, password) =>
    this.axios.post(USER_REGISTER, { email, username, password });

  loginUser = (username, password) =>
    this.axios.post(USER_LOGIN, {
      username,
      password,
    });
}

export default new HttpService();
