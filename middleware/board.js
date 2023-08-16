import nuxtStorage from "nuxt-storage";
import { useToast } from "vue-toastification";

export default defineNuxtRouteMiddleware((to, from) => {
 
  const toast = useToast();
  
  if (
    from.name === "board" &&
    to.name !== "login" &&
    !nuxtStorage.localStorage.getData("userToken")
  ) {
    toast("Please login first .", {
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
      type: "warning",
    });
    return navigateTo("/");
  }
});
