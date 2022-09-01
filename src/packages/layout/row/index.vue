<template>
  <div :class="getComponentName()" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script>
const name = "sm-row"
export default {
  name,
  props:{
    gutter: {
      type: Number,
      default: null
    },
    justify: {
      type: String,
      validator(type) {
        if(type && !["start","end","center","space-around","space-between"].includes(type)) {
          console.error(`类型必须是：${["start","end","center","space-around","space-between"].join(", ")}`)
          return false
        }
        return true
      }
    }
  },
  computed: {
    rowStyle() {
      let style = {}
      if(this.gutter) {
        style = {
          ...style,
          marginLeft: -this.gutter / 2 + "px",
          marginRight: -this.gutter / 2 + "px"
        }
      }
      if(this.justify) {
        let key = ["start","end"].includes(this.justify) ? "flex-" + this.justify : this.justify
        style = {
          ...style,
          justifyContent: key
        }
      }
      return style
    }
  },
  mounted() {
    if(this.gutter) {
      this.$children.forEach(child => {
        child.gutter = this.gutter
      })
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

  .sm-row {
    display: flex;
    width: 100%;
    overflow: hidden;
    flex-wrap: wrap;
  }

</style>