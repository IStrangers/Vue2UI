<template>
  <div 
  :class="getComponentName()" 
  :style="{width,height}"
  @mouseenter="handleMouseenter"
  @mouseleave="handleMouseleave"
  @touchstart="handleTouchstart"
  @touchend="handleTouchend">
    <div class="viewport">
      <slot></slot>
    </div>
    <div class="dots">
      <span 
      v-for="i in childrenSize" 
      :key="i"
      :class="{active: i - 1 === currentSelected}"
      @click="select(i - 1)">{{i}}</span>
    </div>
    <div class="arrow-box">
      <sm-button icon="arrow-left" @click="select(currentSelected - 1,true)"></sm-button>
      <sm-button icon="arrow-right" @click="select(currentSelected + 1,true)"></sm-button>
    </div>
  </div>
</template>

<script>
const name = "sm-carousel"
export default {
  name,
  props:{
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "200px"
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 3000
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentSelected: this.initialIndex,
      timer: null,
      reverse: false,
      children: [],
      childrenSize: 0,
    }
  },
  mounted() {
    this.children = this.$children.filter(child => child.$options.name === `${name}-item`)
    this.childrenSize = this.children.length
    this.run()
  },
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    getComponentName() {
      return name
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
    run() {
      if(!this.autoplay) {
        return
      }
      this.timer = setInterval(() => {
        this.select(this.currentSelected + 1)
      },this.delay)
    },
    select(newIndex,forceLoop) {
      const index = this.currentSelected
      if(newIndex === this.childrenSize) {
        newIndex = 0
      }
      if(newIndex === -1) {
        newIndex = this.childrenSize - 1
      }
      this.reverse = index > newIndex
      if(forceLoop || (this.timer && this.loop)) {
        if(index === 0 && newIndex === this.childrenSize - 1) {
          this.reverse = true
        } else if(index === this.childrenSize - 1 && newIndex === 0) {
          this.reverse = false
        }
      }
      this.children.forEach(child => {
        child.reverse = this.reverse
      })
      this.$nextTick(() => {
        this.currentSelected = newIndex
      })
    },
    handleMouseenter() {
      this.clearTimer()
    },
    handleMouseleave() {
      this.run()
    },
    handleTouchstart(event) {
      this.clearTimer()
      this.startTouch = event.touches[0]

    },
    handleTouchend(event) {
      const endTouch = event.changedTouches[0]
      const {clientX: x1,clientY: y1} = this.startTouch
      const {clientX: x2,clientY: y2} = endTouch
      const disX = Math.abs(x2 - x1)
      const disY = Math.abs(y2 - y1)
      const distance = Math.sqrt(disX,2) + Math.pow(disY,2)
      const x = Math.sqrt(2) / 2 * distance
      //判断拖动是否在45度角
      if(disY < x) {
        if(x2 > x1) {
          this.select(this.currentSelected - 1,true)
        } else {
          this.select(this.currentSelected + 1,true)
        }
      }
      this.run()
    },
  }
}
</script>

<style lang="scss">

  .sm-carousel {
    overflow: hidden;
    position: relative;

    .viewport {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .dots {
      position: absolute;
      bottom: 20px;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;

      span {
        display: inline-block;
        width: 20px;
        height: 10px;
        background: #ccc;
        margin: 5px;
        text-indent: -9999px;
        opacity: 0.5;
        cursor: pointer;

        &:active {
          opacity: 1;
        }
      }
    }

    .arrow-box {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0px 18px;

      .sm-button {
        padding: 8px 9px;
        opacity: 0.5;
        border-radius: 50%;
        height: unset;
        background:rgba(220,223,230,0.3)
      }

    }
  }

</style>