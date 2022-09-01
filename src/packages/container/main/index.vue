<template>
  <main :class="getComponentName()">
    <slot></slot>
  </main>
</template>

<script>
const name = "sm-main"
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

  .sm-main {
    flex: 1;
    padding: 20px;
  }

</style>