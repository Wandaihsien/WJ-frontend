import { createRouter, createWebHistory } from 'vue-router'
import AllProducts from '../views/AllProducts.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Users from '../views/Users.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_API_URL),
  routes:[
    {
      path: '/',
      name: 'Allproducts',
      component: AllProducts,
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: SignUp,
    },
    {
      path: '/Users',
      name: 'Users',
      component: Users,
    }
  ],
})

export default router