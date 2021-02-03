import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import './permission'
import router from './router'
import './assets/style/reset.css'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    toolbar: true
  }
})
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  options: { path: "" } //Optional options
}))
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
