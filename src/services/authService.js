import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  registerJoueur(username, email, password,roles,firstName,lastName,equipeCoach,equipeNutritionniste) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      roles,
      firstName,
      lastName,
      equipeCoach,
      equipeNutritionniste
    });
  }

  registerCoach(username, email, password,roles,firstName,lastName,equipe) {
    return axios.post(API_URL + "signup/coach", {
      username,
      email,
      password,
      roles,
      firstName,
      lastName,
      equipe
    });
  }
  registerNUTRITIONNISTE(username, email, password,roles,firstName,lastName,equipe) {
    return axios.post(API_URL + "signup/nutritionniste", {
      username,
      email,
      password,
      roles,
      firstName,
      lastName,
      equipe
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();