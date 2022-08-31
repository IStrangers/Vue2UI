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
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style lang="scss">
  p{
    margin: 30px;
  }
</style>
