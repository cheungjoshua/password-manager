<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { PasswordType } from "../../types/password";

import ListItem from "./ListItem.vue";

const passwordsList = ref<PasswordType[]>([]);
const selectedItem = ref<PasswordType>();

const fetchPasswordsList = async () => {
  const { data } = await axios.get("/api/passwords/", {
    withCredentials: true,
  });

  passwordsList.value = data.passwordsList;
};

const selectItem = (item: PasswordType) => {
  selectedItem.value = item;

  console.log("selected", selectedItem.value);
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
      @click="selectItem(item)"
    />
  </div>
</template>

<style lang="scss" scoped></style>
