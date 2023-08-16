<template>
    <div class="nav-container flex justify-center items-center w-full h-12 bg-indigo-600">
        <div class="auth-container flex justify-center items-center w-full h-12 gap-12" v-if="!token">
            <NuxtLink class="no-underline text-white h-7 p-1 text-2xl hover:text-black hover:underline" to="/login">Login</NuxtLink>
            <NuxtLink class="no-underline text-white h-7 p-1 text-2xl  hover:text-black hover:underline" to="/register">Register</NuxtLink>
     
        </div>
        <div class="user-container flex justify-center items-center w-full h-12 gap-12" v-else>
            <NuxtLink class="no-underline text-white h-7 p-1 text-2xl  hover:text-black hover:underline" to="/board">Game</NuxtLink>
            <NuxtLink class="no-underline text-white h-7 p-1 text-2xl  hover:text-black hover:underline" to="/score">Score</NuxtLink>
            <NuxtLink class="no-underline text-white h-7 p-1 text-2xl  hover:text-black hover:underline" href="javascript:void(0)" @click="handleLogout">Logout</NuxtLink>
        </div>
    </div>
</template>


<script setup>
import { storeToRefs } from 'pinia'
import { useBoardStore ,useUserStore} from '../store';

const { updatePoints } = useBoardStore()
const { token } = storeToRefs(useUserStore())
const { logoutUser } = useUserStore()

async function  handleLogout() {

    logoutUser()
    updatePoints()
    await navigateTo('/')
    console.log('logout')
}

</script>

