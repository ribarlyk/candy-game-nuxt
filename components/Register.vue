<template>
  <div
    class="container font-roboto flex justify-center items-center w-full h-128 bg-no-repeat bg-center bg-logreg-pattern mx-auto my-0"
  >
    <form
      @submit.prevent="handleUserRegister"
      class="login flex flex-col justify-center p-12 rounded-lg bg-white shadow-lg shadow-blue-500/50"
      data-test="form"
    >
      <div class="group relative mb-11">
        <input
          type="text"
          id="register"
          name="register"
          v-model="userNameReg"
          required
          class="text-lg py-2.5 pr-2.5 pl-1 block w-300 border-b border-indigo-600 mt-5 :focus-outline outline-0"
        />
        <span
          class="highlight absolute h-60p w-100px top-1/4 left-0 pointer-events-none opacity-50"
        ></span>
        <span
          class="bar relative block w-300 before:h-0.5 before:left-1/2 before:w-0 before:absolute before:bottom-px before:bg-indigo-600 before:duration-200 before:ease-in-out after:h-0.5 after:w-0 after:absolute after:bottom-px after:right-1/2 after:bg-indigo-600 after:duration-200 after:ease-in-out"
        ></span>
        <label
          for="register"
          class="text-black absolute pointer-events-none duration-200 ease-in-out left-1 top-2.5"
          >Name</label
        >
      </div>

      <div class="group relative mb-11">
        <input
          type="password"
          id="pass"
          name="pass"
          v-model="passReg"
          required
          class="text-lg py-2.5 pr-2.5 pl-1 block w-300 border-b border-indigo-600 mt-5 :focus-outline outline-0"
        />
        <span
          class="highlight absolute h-60p w-100px top-1/4 left-0 pointer-events-none opacity-50"
        ></span>
        <span
          class="bar relative block w-300 before:h-0.5 before:left-1/2 before:w-0 before:absolute before:bottom-px before:bg-indigo-600 before:duration-200 before:ease-in-out after:h-0.5 after:w-0 after:absolute after:bottom-px after:right-1/2 after:bg-indigo-600 after:duration-200 after:ease-in-out"
        ></span>
        <label
          for="pass"
          class="text-black absolute pointer-events-none duration-200 ease-in-out left-1 top-2.5"
          >Password</label
        >
      </div>

      <div class="group relative mb-11">
        <input
          type="password"
          id="repass"
          name="repass"
          v-model="repassReg"
          required
          class="text-lg py-2.5 pr-2.5 pl-1 block w-300 border-b border-indigo-600 mt-5 :focus-outline outline-0"
        />
        <span
          class="highlight absolute h-60p w-100px top-1/4 left-0 pointer-events-none opacity-50"
        ></span>
        <span
          class="bar relative block w-300 before:h-0.5 before:left-1/2 before:w-0 before:absolute before:bottom-px before:bg-indigo-600 before:duration-200 before:ease-in-out after:h-0.5 after:w-0 after:absolute after:bottom-px after:right-1/2 after:bg-indigo-600 after:duration-200 after:ease-in-out"
        ></span>
        <label
          for="repass"
          class="text-black absolute pointer-events-none duration-200 ease-in-out left-1 top-2.5"
          >Repass</label
        >
      </div>
      <button
        class="mt-12 h-10 text-white bg-indigo-600 rounded-lg border border-white hover:opacity-70 hover:cursor-pointer"
      >
        Register
      </button>
      <p class="footer text-center">
        Already have an account ? Login
        <NuxtLink  class="text-indigo-600" to="/login">here</NuxtLink> .
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useUserStore } from "../store/UserStore";

const { registerUser } = useUserStore();
const passReg = ref(null);
const repassReg = ref(null);
const router = useRouter();
const toast = useToast();
const userNameReg = ref(null);

async function handleUserRegister() {
  if (passReg.value === repassReg.value && userNameReg !== "") {
    if (passReg.value.length <= 5) {
      toast("Password is too short.", {
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
      return;
    }
    let test = await registerUser(userNameReg.value, passReg.value, 0);
    toast("User Registered", {
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
      type: "success",
    });
    console.log(test);
    if (test) {
      router.push({ path: "/login" });
    }
  } else {
    toast("Passwords missmatch", {
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
  }
}
</script>

<style scoped>
input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}
input:focus ~ .highlight {
  animation: inputHighlighter 0.3s ease;
}
@keyframes inputHighlighter {
  from {
    background: #5264ae;
  }

  to {
    width: 0;
    background: transparent;
  }
}
</style>

