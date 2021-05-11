import axios from "axios";
import {
  COMPETITION,
  COMPETITION_DETAILS,
  COMPETITION_RESULT,
  USER_LOGIN,
  USER_REGISTER,
} from "../const/endpoints";

const baseURL = "http://localhost:8080";

class HttpService {
  constructor() {
    this.axios = axios.create({ baseURL });
    this.setTokenResult(this.authHeader());
  }

  registerUser = (username, email, password) =>
    this.axios.post(USER_REGISTER, { email, username, password });

  loginUser = (username, password) =>
    this.axios
      .post(USER_LOGIN, {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          this.setTokenResult(response.data.token);
        }
      })
      .catch(console.error);

  setTokenResult = (token) => {
    this.tokenResult = token;
    this.axios.defaults.headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};
  };

  authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      return user.token;
    } else {
      return {};
    }
  };

  logout = () => {
    localStorage.removeItem("user");
  };

  createCompetition = (
    title,
    description,
    category,
    image,
    usernames,
    endDate
  ) =>
    this.axios.post(COMPETITION, {
      title,
      description,
      category,
      image,
      usernames,
      endDate,
    });

  getCompetitions = () => this.axios.get(COMPETITION);

  getCompetitionDetails = (id) => this.axios.get(COMPETITION_DETAILS(id));

  addCompetitionResult = (id, result) =>
    this.axios.post(COMPETITION_RESULT(id), { result });
}

export default new HttpService();
