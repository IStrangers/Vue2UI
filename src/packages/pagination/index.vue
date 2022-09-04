<template>
  <ul :class="getComponentName()">
    <li  @click="select(currentPage - 1)"><sm-icon icon="arrow-left"></sm-icon></li>
    <li :class="{active: currentPage === 1}" @click="select(1)"><span>1</span></li>
    <li v-if="showPrevMore"><span>...</span></li>

    <li v-for="p in pagers" :key="p" :class="{active: currentPage === p}" @click="select(p)">
      <span>{{p}}</span>
    </li>

    <li v-if="showNextMore"><span>...</span></li>
    <li :class="{active: currentPage === total}" @click="select(total)"><span>{{total}}</span></li>
    <li @click="select(currentPage + 1)"><sm-icon icon="arrow-right"></sm-icon></li>
  </ul>
</template>

<script>
const name = "sm-pagination"
export default {
  name,
  props:{
    total: {
      type: Number,
      default: 0
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      showPrevMore: false,
      showNextMore: false,
    }
  },
  computed: {
    pagers() {
      let showPrevMore = false
      let showNextMore = false
      const middleValue = Math.floor(this.pagerCount / 2)
      if(this.total > this.pagerCount) {
        if(this.currentPage > middleValue + 1) {
          showPrevMore = true
        } 
        if(this.currentPage < this.total - middleValue) {
          showNextMore = true
        }
      }
      const arr = []
      if(showPrevMore && showNextMore) {
        const val = (this.pagerCount - 2) >> 1
        for(let i = this.currentPage - val; i <= this.currentPage + val; i++) {
          arr.push(i)
        }
      } else if(showPrevMore) {
        const start = this.total - (this.pagerCount - 2)
        for(let i = start; i < this.total; i++) {
          arr.push(i)
        }
      } else if(showNextMore) {
        for(let i = 2; i < this.pagerCount; i++) {
          arr.push(i)
        }
      } else {
        for(let i = 2; i < this.total; i++) {
          arr.push(i)
        }
      }
      this.showPrevMore = showPrevMore
      this.showNextMore = showNextMore
      return arr
    }
  },
  methods: {
    getComponentName() {
      return name
    },
    select(current) {
      if(current < 1) {
        current = 1
      }
      if(current > this.total) {
        current = this.total
      }
      if(current === this.currentPage) {
        return
      }
      this.$emit("update:current-page",current)
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/var.scss";
  .sm-pagination {
    display: flex;
    align-items: center;
    user-select: none;

    li {
      cursor: pointer;
      display: inline-flex;

      &:not(:first-child):not(:last-child) {
        padding: 2px 15px;
      }

      &.active,
      &:hover {
        color: $primary;
      }
    }

  }

</style>