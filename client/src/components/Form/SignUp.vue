<script lang="ts" setup>
import { ref } from "vue";

import Form from "./Form.vue";

const props = defineProps({
  checkIsMember: {
    type: Function,
    required: true,
  },
});

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const pending = ref(false);
</script>
<template>
  <div class="signUpFormWrapper">
    <Form>
      <h2>Create Account</h2>
      <label>
        Username:
        <input
          v-model="username"
          type="text"
          name="username"
          placeholder="Enter Username"
          required
        />
      </label>
      <label>
        Email:
        <input
          v-model="email"
          type="text"
          name="email"
          placeholder="Enter Email Address"
          required
        />
      </label>
      <label>
        Password:
        <input
          v-model="password"
          type="text"
          name="password"
          placeholder="Enter Password"
          required
        />
      </label>
      <label>
        Confirm Password:
        <input
          v-model="confirmPassword"
          type="text"
          name="confirmPassword"
          placeholder="Enter Password"
          required
        />
      </label>
      <button type="submit">Create</button>
      <p>
        Already have a account?
        <span class="link" @click="checkIsMember(true)">Log In</span>
      </p>
    </Form>
  </div>
</template>
<style lang="scss" scoped></style>
