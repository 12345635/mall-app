import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
if(!window.Vue){
  Vue.use(VueRouter);
}
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:"/classify",
        name:"Classify",
        component:()=>import(/* webpackChunkName: "Classify" */ "../views/Classify.vue"),
      },
      {
        path:"/shopping",
        name:"Shopping",
        component:()=>import(/* webpackChunkName: "Shoppgin" */ "../views/Shopping.vue"),
      }
    ]
  },
  {
    path: '/search',
    name:"Search",
    component:()=>import(/* webpackChunkName: "Search" */ "../views/Search.vue"),
  },
  {
    path: '*',
    redirect:"/"
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
