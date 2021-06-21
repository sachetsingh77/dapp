import Vue from 'vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'

Vue.use(vuetify)
Vue.use(VueRouter)

function getRouter() {
  const BinaryOptions = require('../src/components/Options.vue').default
  const routes = [
    {name: 'home', path: "/", component: BinaryOptions}
  ]
  return new VueRouter({mode: "history", routes})
}

function setDocHeight() { document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)}

window.addEventListener('resize', function () { setDocHeight()})
window.addEventListener('orientationchange', function () { setDocHeight()})

setDocHeight()

async function main() {
  const router = getRouter()
  const App = require('../src/App.vue').default
  new Vue({
    vuetify,
    router,
    render: h => h(App)
  }).$mount('#app')

  document.title = 'Gluon Apps | Leverj.io'
}

main()