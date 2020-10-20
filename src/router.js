import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "heroes" */ './views/home.vue'),
    },
    {
      path: '/metalCalc',
      name: 'metalCalc',
      component: () =>
        import(/* webpackChunkName: "heroes" */ './views/metalcalculator.vue'),
    },
    {
      path: '/boat',
      name: 'boat',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "boat" */ './views/boat.vue'),
    },
    {
      path: '/drummer',
      name: 'drummer',
      component: () =>
        import(/* webpackChunkName: "drummer" */ './views/drummer.vue'),
    },
  ],
});
