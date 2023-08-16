<script setup lang="ts">
import { ref } from "vue";


const currentPage = ref(1);
</script>

<template>
  <vue-awesome-paginate
    :total-items="20"
    :items-per-page="28"
    :max-pages-shown="10"
   
  />
</template>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: rgb(79 ,70 ,229);
  color: white;
}
.active-page:hover {
  background-color: #5f35b8;
}
</style>
