<template>
  <div id="app">
    <p>
      <sm-button>默认</sm-button>
      <sm-button loading>默认</sm-button>
      <sm-button icon="sousuo">默认</sm-button>
      <sm-button icon="sousuo" icon-position="right">默认</sm-button>
      <sm-button type="primary">主要按钮</sm-button>
      <sm-button type="warning">警告按钮</sm-button>
      <sm-button type="danger">危险按钮</sm-button>
      <sm-button type="success">成功按钮</sm-button>
      <sm-button type="info">信息按钮</sm-button>
    </p>
    <p>
      <sm-button-group>
        <sm-button type="primary">主要按钮</sm-button>
        <sm-button type="warning">警告按钮</sm-button>
        <sm-button type="danger">危险按钮</sm-button>
        <sm-button type="success">成功按钮</sm-button>
        <sm-button type="info">信息按钮</sm-button>
      </sm-button-group>
    </p>
    <p>
      <sm-icon icon="sousuo"></sm-icon>
      <sm-icon icon="edit"></sm-icon>
    </p>
    <p>
      <sm-row :gutter="50" justify="start">
        <sm-col :xs="2" :sm="6" :md="4" :lg="3" :xl="1">
          <div>col1</div>
        </sm-col>
        <sm-col>
          <div>col2</div>
        </sm-col>
        <sm-col :offset="6">
          <div>col3</div>
        </sm-col>
      </sm-row>
    </p>
    <p>
      <sm-container>
        <sm-header>Header</sm-header>
        <sm-main>Main</sm-main>
      </sm-container>

      <sm-container>
        <sm-header>Header</sm-header>
        <sm-main>Main</sm-main>
        <sm-footer>Footer</sm-footer>
      </sm-container>

      <sm-container>
        <sm-aside width="200px">Aside</sm-aside>
        <sm-main>Main</sm-main>
      </sm-container>

      <sm-container>
        <sm-header>Header</sm-header>
        <sm-container>
          <sm-aside width="200px">Aside</sm-aside>
          <sm-main>Main</sm-main>
        </sm-container>
      </sm-container>

      <sm-container>
        <sm-header>Header</sm-header>
        <sm-container>
          <sm-aside width="200px">Aside</sm-aside>
          <sm-container>
            <sm-main>Main</sm-main>
            <sm-footer>Footer</sm-footer>
          </sm-container>
        </sm-container>
      </sm-container>

      <sm-container>
        <sm-aside width="200px">Aside</sm-aside>
        <sm-container>
          <sm-header>Header</sm-header>
          <sm-main>Main</sm-main>
        </sm-container>
      </sm-container>

      <sm-container>
        <sm-aside width="200px">Aside</sm-aside>
        <sm-container>
          <sm-header>Header</sm-header>
          <sm-main>Main</sm-main>
          <sm-footer>Footer</sm-footer>
        </sm-container>
      </sm-container>
    </p>
    <p>
      <sm-input 
      v-model="userName" 
      type="text" 
      name="userName"
      placeholder="请输入"
      :disabled="userName.length >= 3"
      :clearable="true">
      </sm-input>
      {{userName}}
      <sm-input 
      v-model="userName" 
      type="password" 
      name="userName"
      placeholder="请输入"
      :disabled="userName.length >= 3"
      :showPassword="true">
      </sm-input>
      <sm-input 
      type="text" 
      placeholder="前Icon"
      prefix-icon="edit">
      </sm-input>
      <sm-input 
      type="text" 
      placeholder="后Icon"
      suffix-icon="edit">
      </sm-input>
    </p>
    <p>
      <sm-upload
      name="uploadFile"
      action="localhost:8080"
      accept="image/jpeg"
      :file-list="fileList"
      :limit="3"
      :multiple="true"
      :on-exceed="onExceed"
      :on-change="onChange"
      :on-success="onSuccess"
      :on-error="onError"
      :on-progress="onProgress"
      :before-upload="beforeUpload"
      :drag="true"
      >
        <sm-button 
        type="primary"
        icon="shangchuan">
          点击上传
        </sm-button>
        <div slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </sm-upload>
    </p>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      userName: "",
      fileList: []
    }
  },
  methods: {
    onExceed() {
      console.log("onExceed")
    },
    onChange() {
      console.log("onChange")
    },
    onSuccess() {
      console.log("onSuccess")
    },
    onError() {
      console.log("onError")
    },
    onProgress() {
      console.log("onProgress")
    },
    beforeUpload(rawFile) {
      if((rawFile.size / 1024) > 500) {
        return false
      }
      return true
    },
  }
}
</script>

<style lang="scss">
  p{
    margin: 30px;
  }

  .sm-header, .sm-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .sm-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .sm-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .sm-container {
    margin-bottom: 40px;
  }
  
  .sm-container:nth-child(5) .sm-aside,
  .sm-container:nth-child(6) .sm-aside {
    line-height: 260px;
  }
  
  .sm-container:nth-child(7) .sm-aside {
    line-height: 320px;
  }
</style>
