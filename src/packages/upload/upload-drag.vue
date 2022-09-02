<template>
  <div 
  :class="getComponentName()" 
  @drop.prevent="onDrag" 
  @dragover.prevent 
  @dragleave.prevent>
    <sm-icon icon="shangchuan"></sm-icon>
    <span>将文件拖拽到此区域</span>
  </div>
</template>

<script>
const name = "sm-upload-drag"
export default {
  name,
  props:{

  },
  methods: {
    getComponentName() {
      return name
    },
    onDrag(event) {
      this.$emit("file",event.dataTransfer.files)
    }
  }
}
</script>

<style lang="scss">

  .sm-upload-drag {
    background: #eee;
    border: 1px solid #aaa;
    border-radius: 10px;
    width: 360px;
    height: 180px;
    line-height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;

    .sm-icon {
      width: 65px;
      height: 65px;
    }
  }

</style>