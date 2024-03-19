<script lang="ts" setup></script>

<template>
  <div class="searchListWrapper">
    <section class="searchInputSection">
      <input type="text" placeholder="Search" />
      <button>Search</button>
    </section>
    <section class="listSearchItemsSection"></section>
  </div>
</template>

<style lang="scss" scoped>
.searchListWrapper {
  display: flex;
  flex-direction: column;

  .searchInputSection {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 1em;
    width: 100vw;
    box-shadow: 0px 5px 4px 0px #80808070;

    input {
      border: none;
      padding: 0.5em;
      border-radius: 6px 0 0 6px;
      font-size: 1em;
      height: 30px;
      outline: 2px solid white;
    }

    input:focus-visible {
      outline: 2px solid #43b343;
    }

    button {
      border: none;
      padding: 0.5em;
      border-radius: 0 6px 6px 0;
      height: 34px;
      background: var(--button-green);
      color: white;
      font-size: 1em;
      cursor: pointer;
      transition: box-shadow 0.3s;

      &:active {
        box-shadow: inset rgba(0, 0, 0, 0.35) 0px 3px 15px;
      }
    }
  }
}
</style>
