<script lang="ts" setup>
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
</script>
<template>
  <div class="signUpFormWrapper">
    <form action="">
      <label>Username</label>
      <input
        v-model="username"
        type="text"
        name="username"
        placeholder="Enter Username"
        required
      />
      <label>Email</label>
      <input
        v-model="email"
        type="text"
        name="email"
        placeholder="Enter Email Address"
        required
      />
      <label>Password</label>
      <input
        v-model="password"
        type="text"
        name="password"
        placeholder="Enter Password"
        required
      />
      <label>Confirm Password</label>
      <input
        v-model="confirmPassword"
        type="text"
        name="confirmPassword"
        placeholder="Enter Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<style lang="scss" scoped></style>
