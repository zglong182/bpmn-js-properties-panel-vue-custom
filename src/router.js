import Vue from 'vue'
import Route from 'vue-router'

export const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('./pages/home')
  // },
  {
    path: '/viewer',
    name: 'viewer',
    component: () => import('./pages/processDesigner/viewer')
  },
  {
    path: '/modeler',
    name: 'modeler',
    component: () => import('./pages/processDesigner/modeler')
  },
  {
    path: '/panel',
    name: 'panel',
    component: () => import('./pages/processDesigner/panel')
  },
  {
    path: '/',
    name: 'custom',
    component: () => import('./pages/processDesigner/custom/index')
  },
  {
    path: '/example',
    name: 'example',
    component: () => import('./pages/processDesigner/example')
  },
  {
    path: '*',
    name: '404',
    component: {
      template: '<h1>404</h1>'
    }
  }
]

export default new Route({
  mode: 'hash',
  routes: routes
})
Vue.use(Route)
