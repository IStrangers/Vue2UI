<template>
  <div :class="getComponentName()">
    <div class="bar">
      <div class="bar-outer" :style="{height: strokeWidth + 'px'}">
        <div class="bar-inner" :style="barStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
const name = "sm-progress"
export default {
  name,
  props:{
    strokeWidth: {
      type: Number,
      default: 6
    },
    percentage: {
      type: Number,
      default: 0,
      require: true
    },
    color: {
      type: String,
      default: "blue"
    }
  },
  computed: {
    barStyle() {
      const style = {}
      style.width = this.percentage + "%"
      style.background = this.color
      return style
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

  .sm-progress {

    .bar {

      .bar-outer {
        border-radius: 100px;
        background: #eee;
        position: relative;
        vertical-align: middle;
      }

      .bar-inner {
        transform: width .6s ease;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
      }

    }

  }

</style>