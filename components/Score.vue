<template>
  <div
    class="table-container flex flex-col justify-center items-center mt-12 "
    v-if="scores?.result?.length > 0"
  >
    <h1 class="text-3xl mb-5">Games History</h1>
    <table class="border-collapse w-800px max-w-800px min-h-800px">
      <thead>
        <th class="border border-slate-500 text-left bg-indigo-600 text-white">
          Date
        </th>
        <th class="border border-slate-500 text-left bg-indigo-600 text-white">
          User
        </th>
        <th class="border border-slate-500 text-left bg-indigo-600 text-white">
          Points
        </th>
      </thead>

      <tbody>
        <tr v-for="(score, index) in displayedScores" :key="score._id">
          <td class="border border-slate-500 text-left">{{ score.date }}</td>
          <td class="border border-slate-500 text-left">
            {{ score.username }}
          </td>
          <td class="points font-extrabold border border-slate-500 text-left">
            {{ score.points }}
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination
      class="mt-10"
      :total-items="scores?.result?.length"
      v-model="currentPage"
      :on-click="onClickHandler"
    />
  </div>
  <div
    class="spinner-container flex flex-col justify-center items-center mt-12"
    v-else
  >
    <a-space>
      <a-spin size="large" />
    </a-space>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore, useScoresStore } from "../store";

const { getResult } = useScoresStore();
const { token } = storeToRefs(useUserStore());
const { scores } = storeToRefs(useScoresStore());

const props = defineProps(["currentPageValue"]);
const currentPage = ref(1);

const itemsPerPage = 28;
const displayedScores = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return scores.value.result.slice(startIndex, endIndex);
});

const onClickHandler = (page) => {
  currentPage.value = page;
};

onMounted(() => {
  getResult(token.value);
});
</script>
