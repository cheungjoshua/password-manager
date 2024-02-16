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
        Don't have an account yet?
        <span @click="checkIsMember(false)">Create an Account</span>
      </p>
    </form>
  </div>
</template>
<style lang="scss" scoped>
.loginFormWrapper {
  display: flex;
  flex-direction: column;
  gap: 1em;
  background: rgb(35, 35, 35);
  width: 90vw;
  margin: auto;
  padding: 1em;
  border-radius: 1em;

  .inputForm {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
}
</style>
