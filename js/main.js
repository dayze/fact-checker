import Vue from 'vue'
import App from './App'
import '../css/vendors/normalize.min.css'
import 'magic-monkey/stylesheets/magic-monkey-1.0.14.min.css'
import '../css/components/checkboxes.min.css'
import '../css/components/toggleSwitch.css'
import VueResource from 'vue-resource'

Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({ // eslint-
  el: '#app',
  render: h => h(App)
})
