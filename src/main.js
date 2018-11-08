// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vue_resource from 'vue-resource'
import Vue_router from 'vue-router'
import VueRouter from 'vue-router';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/iconfont.css'
import App from './App'
import Buy from './buy'
import Registered from './components/registered'
import Login from './components/login'
import Home from './components/home'
import Sousuo from './components/sousuo'
import Comm from './components/commSong'
import Tops from './components/tops'
import MusicTops from './components/musicTops'
import Song from './components/songInfo'
import Myself from './components/myself'

Vue.config.productionTip = false
Vue.use(Vue_resource);
Vue.use(Vue_router);
Vue.use(Buy);
Vue.use(Element);

const router =new VueRouter({
  routes:[
    {path:"/",component:Home,children:[
      {path:"",component:Comm}
    ]},
    {path:"/registered",component:Registered},
    {path:"/login",component:Login},
    {path:"/info",component:Song},
    {path:"/home",component:Home,children:[
      {path:"comm",component:Comm},
      {path:"sousuo",component:Sousuo},
      {path:"myself",component:Myself},
      {path:"tops",component:Tops},
      {path:"mtops",component:MusicTops}
    ]}
  ],
  mode:"history"
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
