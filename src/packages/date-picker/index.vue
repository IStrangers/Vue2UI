<template>
  <div :class="getComponentName()" v-click-outside="handleBlur">

    <sm-input 
    placeholder="选择日期"
    prefix-icon="date" 
    @focus="handleFocus"
    :value="formateDate"
    @change="handleChange"
    ></sm-input>

    <div class="date-content" v-if="isVisible">
      <div class="date-picker-header">

        <template v-if="mode === 'dates'">
          <sm-icon icon="d-arrow-left" @click="changeYear(-1)"></sm-icon>
          <sm-icon icon="arrow-left" @click="changeMonth(-1)"></sm-icon>
          <span>
            <b @click="mode='years'">{{tempTime.year}}年</b> 
            <b @click="mode='months'">{{padStart(tempTime.month + 1)}}月</b>
          </span>
          <sm-icon icon="arrow-right" @click="changeMonth(1)"></sm-icon>
          <sm-icon icon="d-arrow-right" @click="changeYear(1)"></sm-icon>
        </template>

        <template v-else-if="mode === 'years'">
          <sm-icon icon="d-arrow-left" @click="changeYear(-10)"></sm-icon>
          <span>
            <b>{{startYear}}年 - {{startYear + 9}}年</b> 
          </span>
          <sm-icon icon="d-arrow-right" @click="changeYear(10)"></sm-icon>
        </template>

        <template v-else-if="mode === 'months'">
          <sm-icon icon="d-arrow-left" @click="changeYear(-1)"></sm-icon>
          <span>
            <b>{{this.tempTime.year}}年</b> 
          </span>
          <sm-icon icon="d-arrow-right" @click="changeYear(1)"></sm-icon>
        </template>

      </div>

      <div class="date-picker-content">

        <template v-if="mode === 'dates'">
          <div class="date-row">
            <span v-for="week in weeks" :key="week" class="cell">{{week}}</span>
          </div>
          <div v-for="i in 6" :key="`date-row-${i}`" class="date-row">
            <span v-for="j in 7" :key="`date-cell-${j}`" class="cell cell-day date-cell" :class="{
              'is-not-current-month': !isNotCurrentMonth(getCurrentDate(i,j)),
              'is-today': isToday(getCurrentDate(i,j)),
              'is-select': isSelect(getCurrentDate(i,j))
            }"
            @click="selectDate(getCurrentDate(i,j))">
              {{getCurrentDate(i,j).getDate()}}
            </span>
          </div>
        </template>

        <template v-else-if="mode === 'months'">
          <div v-for="i in 3" :key="`date-row-${i}`" class="date-row">
            <span v-for="j in 4" :key="`date-cell-${j}`" class="cell cell-month date-cell">
              {{getCurrentMethod(i,j)}}
            </span>
          </div>
        </template>
        
        <template v-else-if="mode === 'years'">
          <div v-for="i in 3" :key="`date-row-${i}`" class="date-row">
            <span v-for="j in (i == 3 ? 2 : 4)" :key="`date-cell-${j}`" class="cell cell-year date-cell">
              {{getCurrentYear(i,j)}}
            </span>
          </div>
        </template>

      </div>

    </div>
  </div>
</template>

<script>
import clickOutside from "v-click-outside"
import { getYearMonthDay } from "../../utils/date"

const name = "sm-date-picker"
export default {
  name,
  directives: {
    clickOutside: clickOutside.directive
  },
  props:{
    value: {
      type: [String,Date],
      default: () => new Date()
    }
  },
  data() {
    const [year,month,day] = getYearMonthDay(this.value || new Date())
    return {
      isVisible: false,
      mode: "dates",
      weeks: ["日","一","二","三","四","五","六"],
      months: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
      time: {
        year,
        month,
        day,
      },
      tempTime: {
        year,
        month,
        day,
      },
    }
  },
  watch: {
    value(newValue) {
      const [year,month,day] = getYearMonthDay(newValue)
      this.time = {
        year,month,day
      }
      this.tempTime = {...this.time}
    }
  },
  computed: {
    visibleData() {
      const firstDay = new Date(this.tempTime.year,this.tempTime.month,1)
      let weekDay = firstDay.getDay()
      weekDay = weekDay === 0 ? 7 : weekDay
      const start = firstDay - weekDay * 60 * 60 * 24 * 1000
      const arr = []
      for(let i = 0; i < 42; i++) {
        arr.push(new Date(start + i * 60 * 60 * 24 * 1000))
      }
      return arr
    },
    formateDate() {
      if(!this.value) {
        return
      }
      const { year,month,day } = this.time
      return `${year}-${this.padStart(month + 1)}-${this.padStart(day)}`
    },
    startYear() {
      return this.tempTime.year - this.tempTime.year % 10
    }
  },
  methods: {
    getComponentName() {
      return name
    },
    padStart(val) {
      return String(val).padStart(2,0)
    },
    handleFocus() {
      this.isVisible = true
    },
    handleBlur() {
      this.isVisible = false
      this.mode = "dates"
    },
    handleChange(event) {
      const newValue = event.target.value
      const match = newValue.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
      if(match) {
        this.$emit("input",new Date(match[1],match[2],match[3]))
      } else {
        event.target.value = this.formateDate
      }
    },
    getCurrentDate(i,j) {
      return this.visibleData[(i - 1) * 7 + (j - 1)]
    },
    getCurrentMethod(i,j) {
      i -= 1
      i *= 4
      j -= 1
      return this.months[i + j]
    },
    getCurrentYear(i,j) {
      i -= 1
      i *= 4
      j -= 1
      return this.startYear + i + j
    },
    isNotCurrentMonth(date) {
      const { year,month } = this.tempTime
      const [y,m] = getYearMonthDay(date)
      return year === y && month === m
    },
    isToday(date) {
      const [year,month,day] = getYearMonthDay(new Date())
      const [y,m,d] = getYearMonthDay(date)
      return year === y && month === m && day === d
    },
    isSelect(date) {
      if(!this.value) {
        return false
      }
      const { year,month,day } = this.time
      const [y,m,d] = getYearMonthDay(date)
      return year === y && month === m && day === d
    },
    selectDate(date) {
      this.$emit("input",date)
      this.handleBlur()
    },
    changeYear(count) {
      const oldDate = new Date(this.tempTime.year,this.tempTime.month)
      const newDate = oldDate.setFullYear(oldDate.getFullYear() + count)
      const [year] = getYearMonthDay(new Date(newDate))
      this.tempTime.year = year
    },
    changeMonth(count) {
      const oldDate = new Date(this.tempTime.year,this.tempTime.month)
      const newDate = oldDate.setMonth(oldDate.getMonth() + count)
      const [year,month] = getYearMonthDay(new Date(newDate))
      this.tempTime.year = year
      this.tempTime.month = month
    },
  }
}
</script>

<style lang="scss">
  @import "../../styles/var.scss";

  .sm-date-picker {
    display: inline-block;
    
    .date-content {
      position: absolute;
      z-index: 10;
      user-select: none;
      width: 280px;
      background: #fff;
      border: 1px solid #dcdfe6;
      box-sizing: content-box;
      margin-top: 5px;
      border-radius: 4px;

      .date-picker-header {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .date-picker-content {

        .date-row {
          display: flex;

          .cell {
            flex: 1;
            display: inline-block;
            text-align: center;
            font-weight: 400;
          }
          .cell-day {
            line-height: 40px;
            height: 40px;
          }
          .cell-month,
          .cell-year {
            line-height: 60px;
            height: 60px;
          }
          .date-cell {
            cursor: pointer;
          }
          .date-cell:hover {
            color: $primary;
          }
          .date-cell.is-not-current-month {
            color: #ccc;
          }
          .date-cell.is-today {
            color: $primary;
          }
          .date-cell.is-select {
            color: #fff;
            background: $primary;
            border-radius: 50%;
          }

        }

      }

    }
  }

</style>