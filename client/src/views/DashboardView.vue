<script lang="ts" setup>
import AllList from "../components/List/AllList.vue";
import SearchList from "../components/List/SearchList.vue";
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
    <div class="dashboardBody">
      <AllList v-if="selectedDashboard === Dashboard.All" />
      <SearchList v-if="selectedDashboard === Dashboard.Search" />
    </div>
    <footer class="dashboardFooter">
      <button class="addNewButton">+ ADD NEW</button>
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
  background: var(--background-color);
  position: relative;

  .dashboardNav {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    position: fixed;
    flex-grow: 1;

    button {
      width: 50vw;
      border: none;
      background: none;
      font-size: 1.5em;
      display: flex;
      justify-content: center;
      align-items: center;
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

  .dashboardBody {
    width: 100%;
    margin-top: 80px;
    margin-bottom: 80px;
    //  height: 80vh;
    overflow-y: scroll;
    overflow-x: hidden;
    flex-grow: 3;
  }

  .dashboardFooter {
    width: 100%;
    padding: 1em;
    position: absolute;
    bottom: 0;
    background: var(--background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;

    .addNewButton {
      width: 80%;
      padding: 0.5em 1em;
      background: var(--button-green);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1em;
    }
  }
}
</style>
