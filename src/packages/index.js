import Button from "./button/index.vue"
import Icon from "./icon/index.vue"

function install(vue) {
  vue.component(Button.name,Button)
  vue.component(Icon.name,Icon)
}

if(window.Vue) {
  install(Vue)
}

export default {
  install,
}