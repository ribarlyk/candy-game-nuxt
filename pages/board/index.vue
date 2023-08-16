<template>
  <Board />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["board"],
});
</script>
