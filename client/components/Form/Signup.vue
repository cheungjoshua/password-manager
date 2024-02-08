<script lang="ts" setup>
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
</script>
<template>
  <div class="signUpFormWrapper">
    <h2>Create Account</h2>
    <form action="">
      <label>
        Username
        <input
          v-model="username"
          type="text"
          name="username"
          placeholder="Enter Username"
          required
        />
      </label>
      <label>
        Email
        <input
          v-model="email"
          type="text"
          name="email"
          placeholder="Enter Email Address"
          required
        />
      </label>
      <label>
        Password
        <input
          v-model="password"
          type="text"
          name="password"
          placeholder="Enter Password"
          required
        />
      </label>

      <label>
        Confirm Password
        <input
          v-model="confirmPassword"
          type="text"
          name="confirmPassword"
          placeholder="Enter Password"
          required
        />
      </label>
      <button type="submit">Login</button>
      <p>
        Already have a account?
        <span @click="checkIsMember(true)">Log in</span>
      </p>
    </form>
  </div>
</template>
<style lang="scss" scoped></style>
