<script lang="ts" setup></script>

<template>
  <form class="form">
    <slot></slot>
  </form>
</template>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 95vw;
  max-width: 350px;
  margin: auto;
  padding: 1em;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  label {
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
      border: none;
      padding: 0.25em 0.5em;
      border-radius: 6px;
      font-size: 1em;
    }

    input:focus-visible {
      outline: 2px solid #43b343;
    }
  }

  button {
    background: var(--button-green);
    color: white;
    border: none;
    padding: 0.5em;
    border-radius: 6px;
    font-size: 1em;
    cursor: pointer;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 15px;
    }

    &:active {
      box-shadow: inset rgba(0, 0, 0, 0.35) 0px 3px 15px;
    }

    &:disabled,
    &[disabled] {
      background: grey;
      box-shadow: none;
    }
  }

  .link {
    color: #0000ff;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
