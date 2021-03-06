import axios from "axios";

import { BACKEND_URL } from "appSettings";
import localStorageService from "./localStorageService";
import { createAvatarUrl } from "utils";

class ProfileService {
  updateProfile = (id, data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${BACKEND_URL}/dynamicapi/records/profile/${id}`, data)
        .then((res) => {
          axios
            .get(`${BACKEND_URL}/dynamicapi/records/profile/${id}`)
            .then((res2) => {
              res2.data.type = data.type;
              res2.data.photoURL = createAvatarUrl(res2.data.photo);
              localStorageService.setItem("auth_user", res2.data);
              resolve(res2.data);
            });
        });
    });
  };

  createProfile = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BACKEND_URL}/dynamicapi/records/profile`, data)
        .then((res) => {
          axios
            .get(`${BACKEND_URL}/dynamicapi/records/profile/${res.data}`)
            .then((res2) => {
              res2.data.type = data.type;
              res2.data.photoURL = createAvatarUrl(res2.data.photo);
              localStorageService.setItem("auth_user", res2.data);
              resolve(res2.data);
            });
        });
    });
  };

  getUserProfile = (user) => {
    return new Promise((resolve, reject) => {
      axios.get(`${BACKEND_URL}/dynamicapi/records/profile`).then((res) => {
        if (res.data.records) {
          if (res.data.records.length === 0) {
            resolve({
              name: user.name,
              email: user.email,
              user_id: user.user_id,
            });
          } else {
            const user = res.data.records[0];
            let data = {};
            for (const i in user) {
              const prop = user[i];
              if (prop) {
                data[i] = user[i];
              }
            }

            resolve(data);
          }
        } else {
          // eslint-disable-next-line no-throw-literal
          throw "Data Loading Error";
        }
      });
    });
  };
}

export default new ProfileService();
