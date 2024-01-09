<script lang="ts" setup>
const email = ref("");
const password = ref("");
</script>
<template>
  <div class="loginFormWrapper">
    <form class="inputForm">
      <label>Email</label>
      <input
        v-model="email"
        type="text"
        name="email"
        placeholder="Enter Email"
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
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<style lang="scss" scoped></style>
