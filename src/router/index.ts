import { createRouter, createWebHistory } from 'vue-router'
import AllProducts from '../views/AllProducts.vue'
import Login from '../views/Login.vue'
import User from '../views/User.vue'
import SignUp from '../views/SignUp.vue'
import Cart from '../views/Cart.vue'
import CheckOut from '../views/CheckOut.vue'
import OrderSuccess from '../views/OrderSuccess.vue'
import OrderFailed from '../views/OrderFailed.vue'

const router = createRouter({
  history: createWebHistory('/'),
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
      component: SignUp,
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
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
