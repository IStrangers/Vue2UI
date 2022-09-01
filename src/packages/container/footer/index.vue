<template>
  <footer :class="getComponentName()">
    <slot></slot>
  </footer>
</template>

<script>
const name = "sm-footer"
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

  .sm-footer {
    height: 60px;
  }

</style>