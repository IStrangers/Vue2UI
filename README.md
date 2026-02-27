

# Vue2UI

Vue 2 组件库

## 简介

Vue2UI 是一款基于 Vue 2.x 的轻量级 UI 组件库，提供了一系列常用的基础组件，帮助开发者快速构建 Web 应用界面。

## 组件列表

- **Button** - 按钮组件
- **ButtonGroup** - 按钮组组件
- **Input** - 输入框组件
- **Icon** - 图标组件
- **Layout** - 布局组件（Row、Col）
- **Container** - 容器组件（Header、Aside、Main、Footer）
- **Carousel** - 轮播组件（Carousel、CarouselItem）
- **Table** - 表格组件
- **Pagination** - 分页组件
- **Progress** - 进度条组件
- **DatePicker** - 日期选择器
- **DateRangePicker** - 日期范围选择器
- **Upload** - 上传组件（支持拖拽上传）

## 安装

```bash
npm install vue2-ui
# 或
yarn add vue2-ui
```

## 快速开始

```javascript
import Vue from 'vue'
import Vue2UI from 'vue2-ui'
import 'vue2-ui/dist/vue2-ui.css'

Vue.use(Vue2UI)
```

## 使用示例

### 按钮

```vue
<template>
  <v-button type="primary">主要按钮</v-button>
  <v-button type="success">成功按钮</v-button>
  <v-button-group>
    <v-button>按钮1</v-button>
    <v-button>按钮2</v-button>
  </v-button-group>
</template>
```

### 输入框

```vue
<template>
  <v-input v-model="value" placeholder="请输入内容"></v-input>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
```

### 布局

```vue
<template>
  <v-row :gutter="20">
    <v-col :span="12">12列</v-col>
    <v-col :span="12">12列</v-col>
  </v-row>
</template>
```

### 表格

```vue
<template>
  <v-table :data="tableData" :columns="columns">
  </v-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      columns: []
    }
  }
}
</script>
```

### 分页

```vue
<template>
  <v-pagination
    :total="100"
    :page-size="10"
    @current-change="handlePageChange"
  />
</template>

<script>
export default {
  methods: {
    handlePageChange(page) {
      console.log('当前页:', page)
    }
  }
}
</script>
```

### 日期选择器

```vue
<template>
  <v-date-picker v-model="date" />
  <v-date-range-picker v-model="range" />
</template>

<script>
export default {
  data() {
    return {
      date: '',
      range: []
    }
  }
}
</script>
```

### 文件上传

```vue
<template>
  <v-upload
    action="/api/upload"
    :on-success="handleSuccess"
  />
  <v-upload-drag action="/api/upload" />
</template>

<script>
export default {
  methods: {
    handleSuccess(response) {
      console.log('上传成功', response)
    }
  }
}
</script>
```

## 工具函数

### AJAX

```javascript
import { ajax } from 'vue2-ui'

ajax({
  url: '/api/example',
  method: 'GET',
  success: (data) => {
    console.log(data)
  }
})
```

### 日期处理

```javascript
import { getYearMonthDay } from 'vue2-ui'

const { year, month, day } = getYearMonthDay(new Date())
```

## 项目结构

```
src/
├── packages/          # 组件源码
│   ├── button/
│   ├── button-group/
│   ├── carousel/
│   ├── container/
│   ├── date-picker/
│   ├── date-range-picker/
│   ├── icon/
│   ├── input/
│   ├── layout/
│   ├── pagination/
│   ├── progress/
│   ├── table/
│   └── upload/
├── styles/            # 样式文件
│   └── var.scss
├── utils/             # 工具函数
│   ├── ajax.js
│   └── date.js
├── App.vue
└── main.js
```

## 浏览器支持

- Chrome
- Firefox
- Safari
- Edge

## 开源协议

MIT License