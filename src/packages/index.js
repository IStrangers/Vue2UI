import Icon from "./icon/index.vue"
import Button from "./button/index.vue"
import ButtonGroup from "./button-group/index.vue"
import Row from "./layout/row/index.vue"
import Col from "./layout/col/index.vue"

function install(vue) {
  vue.component(Icon.name,Icon)
  vue.component(Button.name,Button)
  vue.component(ButtonGroup.name,ButtonGroup)
  vue.component(Row.name,Row)
  vue.component(Col.name,Col)
}

if(window.Vue) {
  install(Vue)
}

export default {
  install,
}