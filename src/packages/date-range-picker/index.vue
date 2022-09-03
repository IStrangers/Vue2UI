<template>
  <div :class="getComponentName()">
    
  </div>
</template>

<script>
const name = "sm-date-range-picker"
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

  .sm-date-range-picker {
  }

</style>