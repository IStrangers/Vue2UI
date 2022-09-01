<template>
  <header :class="getComponentName()">
    <slot></slot>
  </header>
</template>

<script>
const name = "sm-header"
export default {
  name,
  props:{

  },
  methods: {
    getComponentName() {
      return name
    }
  }
}
</script>

<style lang="scss">

  .sm-header {
    height: 60px;
  }

</style>