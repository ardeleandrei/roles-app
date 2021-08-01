import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import roles from './store/user_roles.json'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
  state: {
    count: 0,
    roles
  },
  mutations: {
    test() {
      console.log(roles)
    }
  }
})

store.commit('test')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
