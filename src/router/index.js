import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Search from '@/components/search'
import Goods from '@/components/Goods'
import ShopingCart from '@/components/shoppingCart'
import Me from '@/components/me'
import Catogry from '@/components/Catogry';
import Brand from '@/components/brand';
import Detail from '@/components/Detail';
import NewOrder from '@/components/NewOrder';
import Star from '@/components/Star';
import Like from '@/components/Like';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path:'/goods',
        name:'goods',
        component:Goods,
    },
    {
      path:'/shoppingCart',
      name:'shoppingCart',
      component:ShopingCart,
    },
    {
      path:'/me',
      name:'Me',
      component:Me,
    },
    {
      path:'/star',
      name:'star',
      component:Star
    },
    {
      path:'/like',
      name:'like',
      component:Like
    },
    {
      path:'/catogry/:id',
      name:'catogry',
      component:Catogry
    },
    {
      path:'/brand',
      name:'brand',
      component:Brand
    },
    {
      path:'/detail',
      name:'detail',
      component:Detail
    },
    {
      path:'/neworder',
      name:'neworder',
      component:NewOrder
    },
    {
      path:'*',
      redirect:'/'
    }
  ]
})
