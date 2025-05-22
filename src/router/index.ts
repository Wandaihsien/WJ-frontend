import { createRouter, createWebHistory } from 'vue-router'
import AllProducts from '../views/AllProducts.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import User from '../views/User.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_API_URL),
  routes:[
    {
      path: '/allproducts',
      name: 'Allproducts',
      component: AllProducts,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/user',
      name: 'User',
      component: User,
    }
  ],
})

export default router