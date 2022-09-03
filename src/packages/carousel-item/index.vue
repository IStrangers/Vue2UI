<template>
  <transition>
      <div :class="[getComponentName(),reverse ? 'reverse' : '']" v-if="isShow">
        <slot></slot>
      </div>
  </transition>
</template>

<script>
const name = "sm-carousel-item"
export default {
  name,
  props:{

  },
  data() {
    const children = this.$parent.$children.filter(child => child.$options.name === name)
    return {
      index: children.length - 1,
      reverse: false,
    }
  },
  computed: {
    isShow() {
      return this.$parent.currentSelected === this.index
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

  .sm-carousel-item {
    width: 100%;
    height: 100%;

  }

  .v-enter-active {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .v-enter-active,
  .v-leave-active {
    transition: all .5s linear;
  }
  .v-leave-to {
    transform: translateX(-100%);
  }
  .v-enter {
    transform: translateX(100%);
  }
  .v-leave-to.reverse {
    transform: translateX(100%);
  }
  .v-enter.reverse {
    transform: translateX(-100%);
  }

</style>