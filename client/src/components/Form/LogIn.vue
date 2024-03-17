<script lang="ts" setup>
import { watch, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

import Form from "./Form.vue";

const router = useRouter();

const props = defineProps({
  checkIsMember: {
    type: Function,
    required: true,
  },
});

const email = ref("");
const password = ref("");

//const pending = ref(false);
const isEmpty = ref(true);

watch([email, password], () => {
  if (email.value.length > 0 && password.value.length > 0) {
    isEmpty.value = false;
  }
});

const userLogin = async () => {
  try {
    const resp = await axios.post(
      `/users/login/`,
      {
        email: email.value,
        password: password.value,
      },
      {
        withCredentials: true,
      }
    );
    console.log("resp", resp);
    router.push("/dashboard");
  } catch (err) {
    console.error("ERROR", err);
  }
};
</script>

<template>
  <div class="loginFormWrapper">
    <Form>
      <h2>Log In</h2>
      <label>
        Email:
        <input
          v-model="email"
          type="text"
          name="email"
          placeholder="Enter Email"
          required
        />
      </label>
      <label>
        Password:
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="Enter Password"
          required
        />
      </label>
      <button type="button" @click="userLogin" :disabled="isEmpty">
        Login
      </button>
      <p>
        Don't have an account yet?
        <span class="link" @click="checkIsMember(false)">Create One</span>
      </p>
    </Form>
  </div>
</template>

<style lang="scss" scoped></style>
