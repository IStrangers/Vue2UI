<template>
  <aside :class="getComponentName()" :style="{width}">
    <slot></slot>
  </aside>
</template>

<script>
const name = "sm-aside"
export default {
  name,
  props:{
    width: {
      type: String,
      default: "300px"
    }
  },
  methods: {
    getComponentName() {
      return name
    }
  }
}
</script>

<style lang="scss">



</style>