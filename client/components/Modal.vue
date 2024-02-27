<script lang="ts" setup></script>

<template>
  <div class="modalBackground">
    <div class="modalWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modalBackground {
  width: 100vw;
  height: 100vh;
  opacity: 0.5;

  .modalWrapper {
    background: $background;
    padding: 1em;
  }
}
</style>
