<script lang="ts" setup>
import { PropType } from "vue";
import { PasswordType } from "../../types/password";

const props = defineProps({
  passwordItem: {
    type: {} as PropType<PasswordType>,
  },
});

console.log("child", props);
</script>

<template>
  <div class="listItemWrapper">
    {{ passwordItem.app_name }}
  </div>
</template>

<style lang="scss" scoped>
.listItemWrapper {
  text-align: center;
  font-size: 1.3em;
  background: white;
  width: 100%;
  padding: 2em;
  box-shadow: inset rgb(0, 0, 0, 0.35) 0px 0px 10px 0px;
  cursor: pointer;

  &:hover {
    scale: 1.2;
  }
}
</style>
