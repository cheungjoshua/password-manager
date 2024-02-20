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
          type="text"
          name="password"
          placeholder="Enter Password"
          required
        />
      </label>
      <button type="submit">Login</button>
      <p>
        Don't have an account yet?
        <span class="link" @click="checkIsMember(false)">Sign Up</span>
      </p>
    </form>
  </div>
</template>
<style lang="scss" scoped>
.loginFormWrapper {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 90vw;
  max-width: 350px;
  margin: auto;
  padding: 1em;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  .inputForm {
    display: flex;
    flex-direction: column;
    gap: 1em;

    label {
      display: flex;
      align-items: center;
      justify-content: space-between;

      input {
        border: none;
        padding: 0.25em 0.5em;
        border-radius: 6px;
        font-size: 1em;
      }

      input:focus-visible {
        outline: 2px solid #35b635;
      }
    }

    button {
      background: #35b635;
      color: white;
      border: none;
      padding: 0.5em;
      border-radius: 6px;
      font-size: 1em;
    }

    .link {
      color: #0000ff;
      text-decoration: underline;
    }
  }
}
</style>
