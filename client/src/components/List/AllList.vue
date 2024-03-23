<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { PasswordType } from "../../types/password";

import ListItem from "./ListItem.vue";

const passwordsList = ref<PasswordType[]>([]);

const fetchPasswordsList = async () => {
  const { data } = await axios.get("/api/passwords/", {
    withCredentials: true,
  });

  passwordsList.value = data.passwordsList;
};

onMounted(() => {
  fetchPasswordsList();
});
</script>

<template>
  <div class="allListWrapper">
    <ListItem
      v-for="item in passwordsList"
      :passwordItem="item"
      :key="item._id"
    />
  </div>
</template>

<style lang="scss" scoped></style>
