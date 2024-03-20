<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";

type PasswordType = {
  _id: string;
  app_name: string;
  app_username: string;
  app_password: string;
};

const passwordsList = ref<PasswordType[]>([]);

onMounted(async () => {
  const allPasswordsListRes = await axios.get("/api/passwords/", {
    withCredentials: true,
  });

  passwordsList.value = allPasswordsListRes.data;
  console.log("the list", passwordsList.value);
});
</script>

<template>
  <div class="allListWrapper">all</div>
</template>

<style lang="scss" scoped></style>
