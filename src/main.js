import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import roles from "./store/user_roles.json";
import VueRouter from "vue-router";

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({
  state: {
    roles,
    selectedRole: {},
  },
  mutations: {
    addRole: (state, newRole) => {
      state.roles.push(newRole);
    },
    setRoleForEdit: (state, roleId) => {
      state.selectedRole = state.roles.find((role) => role.id === roleId);
    },
    editRole: (state, updatedRole) => {
      state.roles = state.roles.map((role) => {
        if (role.id === updatedRole.id) {
          return updatedRole;
        } else {
          return role
        }
      });
    },
    deleteRole: (state, roleId) => {
      state.roles = state.roles.filter((role) => role.id !== roleId);
    }
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
