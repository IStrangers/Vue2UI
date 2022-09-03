<template>
  <div :class="getComponentName()">
    <sm-upload-drag 
    v-if="drag"
    @click="handleClick"
    @file="uploadFiles">
    </sm-upload-drag>
    <template v-else>
      <div @click="handleClick" :class="getComponentName() + '-button'">
        <slot></slot>
      </div>
      <div>
        <slot name="tip"></slot>
      </div>
    </template>
    <div>
        <ul>
          <li v-for="file in files" :key="file.uid">
            <div :class="getComponentName() + '-list-file'">
              <sm-icon icon="tickets"></sm-icon>
              {{file.name}}
              <sm-progress v-if="file.status === 'uploading'" :percentage="file.percentage"></sm-progress>
              {{file.status}}
              <sm-icon icon="close"></sm-icon>
            </div>
          </li>
        </ul>
    </div>
    <input ref="fileInput" type="file" :name="name" :accept="accept" :multiple="multiple" @change="handleChange">
  </div>
</template>

<script>
import SmUploadDrag from "./upload-drag.vue"
import ajax from "../../utils/ajax.js"

const name = "sm-upload"
export default {
  name,
  components: {
    SmUploadDrag
  },
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
    httpRequest: {
      type: Function,
      default: ajax
    },
    drag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tempIndex: 1,
      files: [],
      requestMap: {},
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
      if(!this.beforeUpload || this.beforeUpload(rawFile) === true) {
        return this.post(rawFile)
      }
    },
    post(rawFile) {
      const uid = rawFile.uid
      const options = {
        file: rawFile,
        filename: this.name,
        action: this.action,
        onProgress: ev => {
          this.handleProgress(ev,rawFile)
        },
        onSuccess: res => {
          this.handleSuccess(res,rawFile)
        },
        onError: err => {
          this.handleError(err,rawFile)
        }
      }
      const req = this.httpRequest(options)
      this.requestMap[uid] = req
      if(req && req.then) {
        req.then(options.onSuccess,options.onError)
      } else {
      }
    },
    httpReques(options) {

    },
    handleProgress(ev,rawFile) {
      const file = this.getFile(rawFile)
      file.status = "uploading"
      file.percentage = ev.percent || 0
      this.onProgress(ev,rawFile)
    },
    handleSuccess(res,rawFile) {
      const file = this.getFile(rawFile)
      file.status = "success"
      this.onSuccess(res,rawFile)
      this.onChange(file)
    },
    handleError(err,rawFile) {
      const file = this.getFile(rawFile)
      file.status = "fail"
      this.onError(err,rawFile)
      this.onChange(file)
      delete this.requestMap[file.uid]
    },
    getFile(rawFile) {
      return this.files.find(file => file.uid === rawFile.uid)
    },
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