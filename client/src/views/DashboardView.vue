<script lang="ts" setup>
import { ref } from "vue";

enum Dashboard {
  All,
  Search,
}

const selectedDashboard = ref(Dashboard.All);

const selectDashboard = (dashboard: Dashboard) => {
  selectedDashboard.value = dashboard;
};
</script>

<template>
  <div class="dashboardWrapper">
    <nav class="dashboardNav">
      <button
        class="buttonAll"
        :class="selectedDashboard === Dashboard.All ? 'isSelect' : ''"
        @click="selectDashboard(Dashboard.All)"
      >
        ALL
      </button>
      <button
        class="buttonSearch"
        :class="selectedDashboard === Dashboard.Search ? 'isSelect' : ''"
        @click="selectDashboard(Dashboard.Search)"
      >
        SEARCH
      </button>
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

    .buttonAll {
      color: rgb(0, 0, 0, 0.5);
      background: rgb(255, 255, 255, 0.5);
      box-shadow: inset rgb(0, 0, 0, 0.35) -4px -4px 15px 0px;
    }

    .buttonSearch {
      color: rgb(0, 0, 0, 0.5);
      background: rgb(255, 255, 255, 0.5);
      box-shadow: inset rgb(0, 0, 0, 0.35) 4px -4px 15px 0px;
    }

    .isSelect {
      color: black;
      background: none;
      box-shadow: none;
    }
  }
}
</style>
