import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
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
      path: '/drummer',
      name: 'drummer',
      component: () =>
        import(/* webpackChunkName: "drummer" */ './views/drummer.vue'),
    },
    {
      path: '/synth',
      name: 'synth',
      component: () =>
        import(/* webpackChunkName: "synth" */ './views/synth.vue'),
    },
  ],
});
