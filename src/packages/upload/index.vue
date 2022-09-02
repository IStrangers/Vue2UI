<template>
  <div :class="getComponentName()">
    <div @click="handleClick" :class="getComponentName() + '-button'">
      <slot></slot>
    </div>
    <div>
      <slot name="tip"></slot>
    </div>
    <input 
    ref="fileInput" 
    type="file" 
    :name="name"
    :accept="accept"
    :multiple="multiple"
    @change="handleChange"
    >
  </div>
</template>

<script>
const name = "sm-upload"
export default {
  name,
  props:{
    name: {
      type: String,
      default: 'file'
    },
    action: {
      type: String,
      require: true
    },
    accept: {
      type: String,
    },
    fileList: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 1
    },
    multiple: {
      type: Boolean,
      default: false
    },
    onExceed: {
      type: Function,
    },
    onChange: {
      type: Function,
    },
    onSuccess: {
      type: Function,
    },
    onError: {
      type: Function,
    },
    onProgress: {
      type: Function,
    },
    beforeUpload: {
      type: Function,
    },
  },
  data() {
    return {
      tempIndex: 1,
      files: [],
    }
  },
  watch: {
    fileList: {
      immediate: true,
      handler(fileList) {
        this.files = fileList.map(item => {
          item.uid = Date.now() + this.tempIndex++
          item.status = "success"
          return item
        })
      }
    }
  },
  computed: {
    fileInput() {
      return this.$refs.fileInput
    }
  },
  methods: {
    getComponentName() {
      return name
    },
    handleClick() {
      this.fileInput.value = ""
      this.fileInput.click()
    },
    handleChange(event) {
      const files = event.target.files;
      this.uploadFiles(files)
    },
    uploadFiles(files) {
      if(this.limit && (this.fileList.length + files.length) > this.limit) {
        return this.onExceed && this.onExceed(files,this.fileList)
      }
      [...files].forEach(rawFile => {
        this.handleStart(rawFile)
        this.upload(rawFile)
      })
    },
    handleStart(rawFile) {
      rawFile.uid = Math.random() + this.tempIndex++
      const file = {
        status: "ready",
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile,
      }
      this.files.push(file)
      this.onChange && this.onChange(file)
    },
    upload(rawFile) {
      if(!this.beforeUpload || this.beforeUpload() === true) {
        return this.post(rawFile)
      }
    },
    post(rawFile) {

    }
  }
}
</script>

<style lang="scss">

  .sm-upload {

    &-button {
      display: inline-block;
    }

    input {
      display: none;
    }
  }

</style>