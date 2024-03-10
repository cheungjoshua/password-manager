<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="dashboardsWrapper">
    <nav>
      <button>ALL</button>
      <button>Search</button>
    </nav>
    <div></div>
    <button>Add New</button>
  </div>
</template>

<style lang="scss" scoped></style>
