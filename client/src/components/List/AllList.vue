<script lang="ts" setup>
import { onMounted } from "vue";
import axios from "axios";

onMounted(async () => {
  const allPasswordsList = await axios.get("/api/passwords/", {
    withCredentials: true,
  });
});
</script>

<template>
  <div class="allListWrapper">all</div>
</template>

<style lang="scss" scoped></style>
