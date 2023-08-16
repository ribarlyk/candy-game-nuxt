<template>
  <div
    class="container font-roboto flex justify-center items-center w-full h-128 bg-no-repeat bg-center bg-logreg-pattern mx-auto my-0"
  >
    <form
      @submit.prevent="handleUserLogin"
      class="login flex flex-col justify-center p-12 rounded-lg bg-white shadow-lg shadow-blue-500/50"
      data-test="form"
    >
      <div class="group relative mb-11">
        <input
          type="text"
          id="userLogin"
          placeholder=" "
          name="userLogin"
          v-model="userNameLogin"
          required
          autocomplete="username"
          class="text-lg py-2.5 pr-2.5 pl-1 block w-300 border-b border-indigo-600 mt-5 :focus-outline outline-0"
        />
        <span
          class="highlight absolute h-60p w-100px top-1/4 left-0 pointer-events-none opacity-50"
        ></span>
       
        <span
          class="bar relative block w-300 before:h-0.5 before:left-1/2 before:w-0 before:absolute before:bottom-px before:bg-indigo-600 before:duration-200 before:ease-in-out after:h-0.5 after:w-0 after:absolute after:bottom-px after:right-1/2 after:bg-indigo-600 after:duration-200 after:ease-in-out"
        ></span>
        <label
          for="userLogin"
          class="text-black absolute pointer-events-none duration-200 ease-in-out left-1 top-2.5"
          >Name</label
        >
      </div>
      <div class="group relative mb-11">
        <input
          type="password"
          id="passLogin"
          placeholder=" "
          name="passLogin"
          v-model="passLogin"
          required
          autocomplete="current-password"
          class="text-lg py-2.5 pr-2.5 pl-1 block w-300 border-b border-indigo-600 mt-5 :focus-outline outline-0"
        />
        <span
          class="highlight absolute h-60p w-100px top-1/4 left-0 pointer-events-none opacity-50"
        ></span>

        <span
          class="bar relative block w-300 before:h-0.5 before:left-1/2 before:w-0 before:absolute before:bottom-px before:bg-indigo-600 before:duration-200 before:ease-in-out after:h-0.5 after:w-0 after:absolute after:bottom-px after:right-1/2 after:bg-indigo-600 after:duration-200 after:ease-in-out"
        ></span>
        <label
          for="passLogin"
          class="text-black absolute pointer-events-none duration-200 ease-in-out left-1 top-2.5"
          >Password</label
        >
      </div>
      <button
        class="mt-12 h-10 text-white bg-indigo-600 rounded-lg border border-white hover:opacity-70 hover:cursor-pointer"
      >
        Login
      </button>
      <p class="footer text-center">
        Don't have an account ? Register
        <NuxtLink class="text-indigo-600" to="/register">here</NuxtLink> .
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useBoardStore, useUserStore } from "../store";

const { loginUser } = useUserStore();
const { points } = storeToRefs(useBoardStore());

const passLogin = ref(null);
const userNameLogin = ref(null);

const calculatedPoints = computed(() => {
  return Math.ceil(points.value / 2);
});

async function handleUserLogin() {
  let user = await loginUser(
    userNameLogin.value,
    passLogin.value,
    calculatedPoints.value
  );
  if (user) {
    await navigateTo("/");
  }
}
</script>

<style scoped>
input:focus ~ label,
input:valid ~ label {
  top: -20px;
  font-size: 14px;
  color: #5264ae;
}
input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}
input:focus ~ .highlight {
  animation: inputHighlighter 0.3s ease;
}

@-webkit-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }

  to {
    width: 0;
    background: transparent;
  }
}

@-moz-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }

  to {
    width: 0;
    background: transparent;
  }
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
