<template>
  <div ref="wrapper" :class="getComponentName()">
    <div ref="tableWrapper" class="table-wrapper" :style="{height}">
      <table ref="table">
        <thead>
          <tr>
            <th v-for="(col,index) in cloneColumns" :key="index" :style="{width: col.width}">
              <div v-if="col.type === 'selection'">
                <input ref="checkAll" type="checkbox" :checked="checkAllStatus" @change="selectAll"/>
              </div>
              <div v-else class="table-cell">
                <span>{{col.title}}</span>
                <span v-if="col.sortable" class="sortable">
                  <sm-icon icon="caret-top" :class="{active: isAsc(col)}" @click="sort(col,isAsc(col) ? 'normal' : 'asc')"></sm-icon>
                  <sm-icon icon="caret-bottom" :class="{active: isDesc(col)}" @click="sort(col,isDesc(col) ? 'normal' : 'desc')"></sm-icon>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,index) in cloneData" :key="index">
            <td v-for="(col,index) in cloneColumns" :key="index">
              <div v-if="col.type === 'selection'">
                <input type="checkbox" @change="selectOne($event,row)" :checked="isChecked(row)"/>
              </div>
              <div v-else>
                <template v-if="col.slot">
                  <slot :name="col.slot" :row="row" :col="col"></slot>
                </template>
                <template v-else>{{row[col.key]}}</template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
const name = "sm-table"
export default {
  name,
  props: {
    height: {
      type: String,
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      cloneColumns: JSON.parse(JSON.stringify(this.columns)),
      cloneData: JSON.parse(JSON.stringify(this.data)),
      selectedItems: [],
    }
  },
  computed: {
    checkAllStatus() {
      return this.cloneData.length === this.selectedItems.length
    }
  },
  watch: {
    selectedItems() {
      if(!this.checkAllStatus) {
        if(this.selectedItems.length > 0) {
          this.$refs.checkAll[0].indeterminate = true
        }
      } else {
        this.$refs.checkAll[0].indeterminate = false
      }
    }
  },
  created() {
    this.cloneColumns.map(col => {
      col.sortType = col.sortType ? col.sortType : "normal"
      this.sort(col,col.sortType)
      return col
    })
    this.cloneData.map(row => row.__ID__ = Math.random())
  },
  mounted() {
    if(this.height) {
      // const wrapper = this.$refs.wrapper
      // const tableWrapper = this.$refs.tableWrapper
      // const table = this.$refs.table
      // const copyTable = table.cloneNode()
      // const thead = table.children[0]
      // tableWrapper.style.paddingTop = thead.getBoundingClientRect().height + "px"
      // copyTable.appendChild(thead)
      // copyTable.style.width = table.offsetWidth + "px"
      // copyTable.classList.add("fix-header")
      // const ths = copyTable.querySelector("thead tr").children
      // const tds = table.querySelector("tbody tr").children

      // for(let index = 0; index < tds.length; index++) {
      //   const item = tds[index]
      //   ths[index].style.width = item.getBoundingClientRect().width + "px"
      // }
      // wrapper.appendChild(copyTable)
    }
  },
  methods: {
    getComponentName() {
      return name
    },
    selectOne(event,row) {
      if(event.target.checked) {
        this.selectedItems.push(row)
      } else {
        this.selectedItems = this.selectedItems.filter(item => item.__ID__ !== row.__ID__)
      }
      this.$emit("on-select",this.selectedItems,row)
    },
    selectAll(event) {
      this.selectedItems = event.target.checked ? this.cloneData : []
      this.$emit("on-select-all",this.selectedItems)
    },
    isChecked(row) {
      return this.selectedItems.some(r => r.__ID__ === row.__ID__)
    },
    isAsc(col) {
      return col.sortType === "asc"
    },
    isDesc(col) {
      return col.sortType === "desc"
    },
    sort(col,sortType) {
      if(!col.sortable) {
        return
      }
      if(col.sortable === "custom") {
        const cloneCol = JSON.parse(JSON.stringify(col))
        this.$emit("on-sort-change",cloneCol,sortType)
      } else {
        const data = JSON.parse(JSON.stringify(this.data))
        if(sortType === "normal") {
          this.cloneData = data
        } else {
          const key = col.key
          this.cloneData = data.sort((a,b) => {
            if(sortType === "asc") {
              return a[key] - b[key]
            } else {
              return b[key] - a[key]
            }
          })
        }
      }
      col.sortType = sortType
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/var.scss";
  .sm-table {
    position: relative;

    .fix-header {
      position: absolute;
      top: 0;
      left: 0;

      th {
        background: #fff;
        text-align: left;
      }
    }

    .table-wrapper {
      overflow-y: scroll;

      table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;

        th,td {
          border-bottom: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }

        .table-cell {
          display: flex;
          justify-content: left;
          align-items: center;
          .sortable {
            display: flex;
            flex-direction: column;
            .sm-icon {
              height: 15px;
              cursor: pointer;
              &.active {
                fill: $primary;
              }
            }
          }
        }
      }
    }
    
  }

</style>