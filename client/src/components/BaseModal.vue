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
  display: flex;
  justify-content: center;
  align-items: center;

  .modalWrapper {
    background: $background;
    padding: 1em;
    border-radius: 1em;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
}
</style>
