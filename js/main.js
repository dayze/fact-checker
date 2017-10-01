import Vue from 'vue'
import App from './App'
import '../css/vendors/normalize.min.css'
import 'magic-monkey/stylesheets/magic-monkey.min.css'
import '../css/components/checkboxes.min.css'
import '../css/components/toggleSwitch.min.css'
import '../css/components/accordion.min.css'
import VueResource from 'vue-resource'

Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({ // eslint-
  el: '#app',
  render: h => h(App)
})
