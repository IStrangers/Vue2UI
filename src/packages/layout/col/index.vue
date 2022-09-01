<template>
    <div :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
const name = "sm-col"
export default {
  name,
  props:{
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: null
    },
    xs: [Number,Object],
    sm: [Number,Object],
    md: [Number,Object],
    lg: [Number,Object],
    xl: [Number,Object],
  },
  data() {
    return {
      gutter: null
    }
  },
  computed: {
    colClass() {
      const classes = [name]
      classes.push(`${name}-${this.span}`)
      if(this.offset) {
        classes.push(`${name}-offset-${this.offset}`)
      }
      ["xs","sm","md","lg","xl"].forEach(type => {
        const val = this[type]
        if(typeof val === "object") {
          const { span,offset } = this[type]
          span && classes.push(`${name}-${type}-${span}`)
          offset && classes.push(`${name}-${type}-${offset}`)
        } else if(val) {
          classes.push(`${name}-${type}-${val}`)
        }
      })
      return classes
    },
    colStyle() {
      let style = {}
      if(this.gutter) {
        style = {
          ...style,
          paddingLeft: this.gutter / 2 + "px",
          paddingRight: this.gutter / 2 + "px"
        }
      }
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
  @import "../../../styles/var.scss";

  .sm-col {

    @for $i from 1 through 24 {
      &-#{$i} {
        width: $i / 24 * 100%;
      }
      &-offset-#{$i} {
        margin-left: $i / 24 * 100%;
      }
    }

    @include res(xs) {
      @for $i from 1 through 24 {
        &-xs-#{$i} {
          width: $i / 24 * 100%;
        }
        &-xs-offset-#{$i} {
          width: $i / 24 * 100%;
        }
      }
    }
    @include res(sm) {
      @for $i from 1 through 24 {
        &-sm-#{$i} {
          width: $i / 24 * 100%;
        }
        &-sm-offset-#{$i} {
          width: $i / 24 * 100%;
        }
      }
    }
    @include res(md) {
      @for $i from 1 through 24 {
        &-md-#{$i} {
          width: $i / 24 * 100%;
        }
        &-md-offset-#{$i} {
          width: $i / 24 * 100%;
        }
      }
    }
    @include res(lg) {
      @for $i from 1 through 24 {
        &-lg-#{$i} {
          width: $i / 24 * 100%;
        }
        &-lg-offset-#{$i} {
          width: $i / 24 * 100%;
        }
      }
    }
    @include res(xl) {
      @for $i from 1 through 24 {
        &-xl-#{$i} {
          width: $i / 24 * 100%;
        }
        &-xl-offset-#{$i} {
          width: $i / 24 * 100%;
        }
      }
    }

  }


</style>