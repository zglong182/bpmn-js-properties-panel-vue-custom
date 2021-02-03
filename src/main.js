import Vue from 'vue'
import App from './App.vue'
import router from './router'
/* highlight.js*/
import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)
/* ant-design-vue */
import 'ant-design-vue/lib/button/style/css'
import 'ant-design-vue/lib/carousel/style/css'
import 'ant-design-vue/lib/tabs/style/css'
import 'ant-design-vue/lib/collapse/style/css'
import 'ant-design-vue/lib/space/style/css'
import 'ant-design-vue/lib/dropdown/style/css'
import 'ant-design-vue/lib/icon/style/css'
import 'ant-design-vue/lib/modal/style/css'
import 'ant-design-vue/lib/row/style/css'
import 'ant-design-vue/lib/col/style/css'
import 'ant-design-vue/lib/input/style/css'
import 'ant-design-vue/lib/drawer/style/css'
import 'ant-design-vue/lib/card/style/css'
import 'ant-design-vue/lib/list/style/css'
import 'ant-design-vue/lib/message/style/css'
import 'ant-design-vue/lib/popconfirm/style/css'
import 'ant-design-vue/lib/form/style/css'
import 'ant-design-vue/lib/select/style/css'
import 'ant-design-vue/lib/table/style/css'
import 'ant-design-vue/lib/form-model/style/css'

import Button from 'ant-design-vue'
import Carousel from 'ant-design-vue'
import Tabs from 'ant-design-vue'
import Collapse from 'ant-design-vue'
import Space from 'ant-design-vue'
import dropdown from 'ant-design-vue'
import Icon from 'ant-design-vue'
import Modal from 'ant-design-vue'
import Row from 'ant-design-vue'
import Col from 'ant-design-vue'
import Input from 'ant-design-vue'
import Drawer from 'ant-design-vue'
import Card from 'ant-design-vue'
import List from 'ant-design-vue'
import Message from 'ant-design-vue'
import Popconfirm from 'ant-design-vue'
import Form from 'ant-design-vue'
import Select from 'ant-design-vue'
import Table from 'ant-design-vue'
import FormModel from 'ant-design-vue'

Vue.use(Button)
Vue.use(Carousel)
Vue.use(Tabs)
Vue.use(Collapse)
Vue.use(Space)
Vue.use(dropdown)
Vue.use(Icon)
Vue.use(Modal)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Drawer)
Vue.use(Card)
Vue.use(List)
Vue.use(Message)
Vue.use(Popconfirm)
Vue.use(Form)
Vue.use(Select)
Vue.use(Table)
Vue.use(FormModel)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
