import { createRouter, createWebHistory } from 'vue-router'
import AllProducts from '../views/AllProducts.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import User from '../views/User.vue'
import Cart from '../views/Cart.vue'
import CheckOut from '../views/CheckOut.vue'
import OrderSuccess from '../views/orderSuccess.vue'
import OrderFailed from '../views/OrderFailed.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_API_URL),
  routes: [
    {
      path: '/',
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
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: CheckOut,
    },
    {
      path: '/checkout/success',
      name: 'Ordersuccess',
      component: OrderSuccess,
    },
    {
      path: '/checkout/failed',
      name: 'Orderfailed',
      component: OrderFailed,
    },
  ],
})

export default router
