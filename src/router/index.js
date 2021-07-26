import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Classify from "../views/Classify.vue"
import Shopping from "../views/Shopping.vue"

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:"/classify",
        name:"Classify",
        component: Classify,
      },
      {
        path:"/shopping",
        name:"Shopping",
        component: Shopping,
      }
    ]
  },
  {
    path: '*',
    redirect:"/"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
