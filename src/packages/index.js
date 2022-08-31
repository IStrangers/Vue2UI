import Icon from "./icon/index.vue"
import Button from "./button/index.vue"
import ButtonGroup from "./button-group/index.vue"


function install(vue) {
  vue.component(Icon.name,Icon)
  vue.component(Button.name,Button)
  vue.component(ButtonGroup.name,ButtonGroup)
}

if(window.Vue) {
  install(Vue)
}

export default {
  install,
}