<template>
    <svg :class="getComponentName()" aria-hidden="true" @click="$emit('click',$event)">
        <use :xlink:href="`#icon-${icon}`"></use>
    </svg>
</template>

<script>
import '../../iocns/icon.js'
const name = "sm-icon"
export default {
  name,
  props:{
    icon:{
      type: String,
      required: true
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
  .sm-icon{
    width: 25px;
    height:25px;
    vertical-align: middle;
  }
</style>