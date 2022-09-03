<template>
  <div :class="inputClass" @mouseenter="isMouseenter=true" @mouseleave="isMouseenter=false">
    <sm-icon
    :icon="prefixIcon"
    v-if="prefixIcon"
    ></sm-icon>
    
    <input 
    ref="input"
    :name="name" 
    :type="inputType" 
    :placeholder="placeholder" 
    :value="value"
    :disabled="disabled"
    @input="$emit('input',$event)"
    @focus="$emit('focus',$event)"
    @blur="$emit('blur',$event)"
    @change="$emit('change',$event)"/>

    <sm-icon
    icon="circle-close"
    v-if="isClearable"
    @click="$emit('input','')"
    @mousedown.native.prevent
    ></sm-icon>

    <sm-icon
    icon="view"
    v-if="isShowPassword"
    @click="changePasswordVisible"
    ></sm-icon>

    <sm-icon
    :icon="suffixIcon"
    v-if="suffixIcon"
    ></sm-icon>
  </div>
</template>

<script>
const name = "sm-input"
export default {
  name,
  props:{
    name: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    prefixIcon: String,
    suffixIcon: String,
  },
  data() {
    return {
      isMouseenter: false,
      passwordVisible: false,
    }
  },
  computed: {
    inputType() {
      if(this.passwordVisible) {
        return "text"
      }
      return this.type
    },
    inputClass() {
      const classes = [name]
      if(this.clearable || this.showPassword || this.suffixIcon) {
        classes.push(`${name}-suffix-icon`)
      }
      if(this.prefixIcon) {
        classes.push(`${name}-prefix-icon`)
      }
      return classes
    },
    isClearable() {
      return (
        this.clearable && 
        this.disabled === false && 
        this.value && 
        this.isMouseenter
      )
    },
    isShowPassword() {
      return (
        this.showPassword && 
        this.disabled === false && 
        this.value && 
        this.isMouseenter
      )
    }
  },
  methods: {
    getComponentName() {
      return name
    },
    changePasswordVisible() {
      this.passwordVisible = !this.passwordVisible
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/var.scss";

  .sm-input {
    display: inline-flex;
    position: relative;

    input {
      padding: 8px;
      width: 150px;
      height: 35px;
      border-radius: $border-radius;
      border: 1px solid $border-color;

      &:focus {
        border: 1px solid $primary;
        outline: none;
      }
      &[disabled] {
        cursor: not-allowed;
        background: #eee;
      }

    }

  }

  .sm-input-prefix-icon {
    input {
      padding-left: 30px;
    }

    .sm-icon {
      cursor: pointer;
      position: absolute;
      left: 8px;
      top: 10px;
      width: 14.5px;
      height: 14.5px;
    }
  }

  .sm-input-suffix-icon {
    input {
      padding-right: 30px;
    }

    .sm-icon {
      cursor: pointer;
      position: absolute;
      right: 8px;
      top: 10px;
      width: 14.5px;
      height: 14.5px;
    }
  }

</style>