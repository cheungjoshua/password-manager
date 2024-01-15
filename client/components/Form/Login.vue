<script lang="ts" setup>
const props = defineProps({
  checkIsMember: {
    type: Function,
    required: true,
  },
});

const email = ref("");
const password = ref("");
</script>
<template>
  <div class="loginFormWrapper">
    <h2>Log In</h2>
    <form class="inputForm">
      <label>
        Email
        <input
          v-model="email"
          type="text"
          name="email"
          placeholder="Enter Email"
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
      <button type="submit">Login</button>
      <p>
        Don't have account yet?
        <span @click="checkIsMember(false)">Create Account</span>
      </p>
    </form>
  </div>
</template>
<style lang="scss" scoped></style>
