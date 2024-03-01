<script lang="ts" setup>
const apiUrl = useRuntimeConfig().public.api_url;

const props = defineProps({
  checkIsMember: {
    type: Function,
    required: true,
  },
});

const email = ref("");
const password = ref("");

const pending = ref(false);
const isEmpty = ref(true);

watch([email, password], () => {
  if (email.value.length > 0 && password.value.length > 0) {
    isEmpty.value = false;
  }
});

const userLogin = async () => {
  try {
    const resp = await useFetch(`${apiUrl}/users/login/`, {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });
    console.log(resp);
  } catch (err) {
    console.error(err);
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
          type="text"
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
