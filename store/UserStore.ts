import { defineStore } from "pinia";
import { HOST } from "../utils/HOST";
import { useToast } from "vue-toastification";
import nuxtStorage from "nuxt-storage";

const toast: any = useToast();

type User = {
  username: string;
  token: string;
};

export const useUserStore = defineStore("UserStore", {
  actions: {
    async loginUser(username: string, password: string) {
      try {
        const response = await fetch(HOST + "auth/login", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        const user = await response.json();
        if (response.ok) {
          this.token = user.token;
          this.username = user.username;

          nuxtStorage.localStorage.setData("userName", user.username);
          nuxtStorage.localStorage.setData("userToken", user.token);
          return user;
        } else {
          throw new Error(user.error);
        }
      } catch (err:any) {
        toast(err.message, {
          position: "bottom-left",
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: "button",
          icon: "fas fa-rocket",
          rtl: false,
          type: "error",
        });
        throw new Error(err);
      }
    },
    async registerUser(username: string, password: string) {
      try {
        const response = await fetch(HOST + "auth/register", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
          return data;
        } else {
          throw new Error(data.error);
        }
      } catch (err:any) {
        toast(err.message, {
          position: "bottom-left",
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: "button",
          icon: "fas fa-rocket",
          rtl: false,
          type: "error",
        });
        throw new Error(err);
      }
    },
    async logoutUser() {
      try {
        const response = await fetch(HOST + "auth/logout", {
          method: "GET",
          mode: "cors",
          headers: {
            authorization:
              "Bearer " + nuxtStorage.localStorage.getData("userToken"),
          },
        });
        (this.username = ""),
          (this.token = ""),
          nuxtStorage.localStorage.clear();

        return response.json();
      } catch (err) {
        console.log(err);
      }
    },
  },
  state: (): User => ({
    username: nuxtStorage.localStorage.getData("userName") || "",
    token: nuxtStorage.localStorage.getData("userToken") || "",
  }),
  persist: {
    storage: persistedState.localStorage,
  },
});
