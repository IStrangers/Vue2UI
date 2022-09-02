import Icon from "./icon/index.vue"
import Button from "./button/index.vue"
import ButtonGroup from "./button-group/index.vue"
import Row from "./layout/row/index.vue"
import Col from "./layout/col/index.vue"
import Aside from "./container/aside/index.vue"
import Container from "./container/container/index.vue"
import Footer from "./container/footer/index.vue"
import Header from "./container/header/index.vue"
import Main from "./container/main/index.vue"
import Input from "./input/index.vue"
import Upload from "./upload/index.vue"

function install(vue) {
  vue.component(Icon.name,Icon)
  vue.component(Button.name,Button)
  vue.component(ButtonGroup.name,ButtonGroup)
  vue.component(Row.name,Row)
  vue.component(Col.name,Col)
  vue.component(Aside.name,Aside)
  vue.component(Container.name,Container)
  vue.component(Footer.name,Footer)
  vue.component(Header.name,Header)
  vue.component(Main.name,Main)
  vue.component(Input.name,Input)
  vue.component(Upload.name,Upload)
}

if(window.Vue) {
  install(Vue)
}

export default {
  install,
}