import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import header from './components/Header.vue';
import footer from './components/footer.vue';
import login from './components/login.vue';
import home from './components/Home.vue';
import Vuex from "vuex";
import VueRouter from 'vue-router';

import createPersistedState from 'vuex-persistedstate';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
Vue.use(vuetify);
Vue.use(Vuex);
Vue.use(VueRouter);




Vue.component('compheader',header);
Vue.component('compfooter',footer)
Vue.component('login',login);
Vue.component('home',home);
const store = new Vuex.Store(
  {
      state: {
          authenticated: false
      },
      mutations: {
          setAuthentication(state, status) {
              state.authenticated = status;
          }
      },
       plugins: [createPersistedState({storage: window.sessionStorage})]
   }
  
);
let router = new VueRouter({  
  routes:[
       {
        path:'/',
        redirect:{
          name:'login',
          component:login
        }
       },
       {
        path:'*',
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
            
              next('/login');
              
          } else {
              next();
          }
      }
    },
    {
      path:'/home',
      name:'home',
      component:home,
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated == false) {
          
            next('/login');
            
        } else {
            next();
        }
    }
      },
      {
        path:'/login',
        name:'login',
        component:login
      },
  ],
  mode:'history',
 
})
new Vue({
  vuetify,
  router,
  store:store,
  render: h => h(App)
}).$mount('#app')
