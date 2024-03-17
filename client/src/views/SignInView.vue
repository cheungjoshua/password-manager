<script lang="ts" setup>
import { ref } from "vue";
import LogIn from "@/components/Form/LogIn.vue";
import SignUp from "@/components/Form/SignUp.vue";

const isMember = ref(true);

function checkIsMember(data: boolean) {
  isMember.value = data;
}
</script>
<template>
  <div class="signInPageWrapper">
    <LogIn v-if="isMember" :checkIsMember="checkIsMember" />
    <SignUp v-else :checkIsMember="checkIsMember" />
  </div>
</template>
<style lang="scss" scoped>
.signInPageWrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  background: #e6e6e6;
}
</style>
