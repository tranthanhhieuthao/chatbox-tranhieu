import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import Notifications from 'vue-notification'

Vue.use(Notifications)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  components: {
    Notifications
  },
  render: h => h(App)
}).$mount('#app')
