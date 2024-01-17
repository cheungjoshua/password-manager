<script lang="ts" setup>
const isMember = ref(true);

function checkIsMember(data: boolean) {
  isMember.value = data;
}
</script>
<template>
  <div class="loginPageWrapper">
    <FormLogin v-if="isMember" :checkIsMember="checkIsMember" />
    <FormSignup v-else :checkIsMember="checkIsMember" />
  </div>
</template>
<style lang="scss" scoped></style>
