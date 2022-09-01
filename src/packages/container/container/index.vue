<template>
  <section :class="[getComponentName(),isVertical ? 'isVertical' : '']">
    <slot></slot>
  </section>
</template>

<script>
const name = "sm-container"
export default {
  name,
  props:{

  },
  data() {
    return {
      isVertical: true
    }
  },
  mounted() {
    this.isVertical = this.$children.some(child => ["sm-footer","sm-header"].includes(child.$options.name))
  },
  methods: {
    getComponentName() {
      return name
    }
  }
}
</script>

<style lang="scss">

  .sm-container{
    display: flex;
    flex: 1;
    flex-direction: row;

    &.isVertical {
      flex-direction: column;
    }
  }

</style>