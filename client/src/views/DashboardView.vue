<script lang="ts" setup></script>

<template>
  <div class="dashboardWrapper">
    <nav class="dashboardNav">
      <button class="buttonAll" :class="{ unSelect: true }">ALL</button>
      <button class="buttonSearch">SEARCH</button>
    </nav>
    <div></div>
    <footer>
      <button>ADD NEW</button>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.dashboardWrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #e6e6e6;

  .dashboardNav {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    position: fixed;

    button {
      width: 50vw;
      border: none;
      background: none;
      font-size: 1.5em;
    }

    .buttonAll.unSelect {
      color: rgb(0, 0, 0, 0.5);
      background: rgb(255, 255, 255, 0.5);
      box-shadow: inset rgb(0, 0, 0, 0.35) -4px -4px 15px 0px;
    }

    .buttonSearch.unSelect {
      color: rgb(0, 0, 0, 0.5);
      background: rgb(255, 255, 255, 0.5);
      box-shadow: inset rgb(0, 0, 0, 0.35) 4px 4px 15px 0px;
    }
  }
}
</style>
