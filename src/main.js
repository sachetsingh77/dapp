import Vue from 'vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import {
  faAngleDoubleDown,
  faAngleDoubleRight,
  faArrowCircleLeft,
  faArrowCircleRight,
  faBell,
  faBellSlash,
  faBolt,
  faBookOpen,
  faCaretLeft,
  faCaretRight,
  faCaretDown,
  faChartLine,
  faCheck,
  faCheckCircle,
  faChevronCircleUp,
  faCircle,
  faCopy,
  faDotCircle,
  faDownload,
  faEdit,
  faExclamation,
  faExclamationTriangle,
  faHistory,
  faInfoCircle,
  faLevelDownAlt,
  faLevelUpAlt,
  faLock,
  faLockOpen,
  faMinus,
  faMinusCircle,
  faMoon,
  faNewspaper,
  faPen,
  faPlayCircle,
  faPlug,
  faPlus,
  faPlusCircle,
  faSadTear,
  faSortAmountDownAlt,
  faSort,
  faSortDown,
  faSpinner,
  faSun,
  faSync,
  faThumbsUp,
  faToggleOff,
  faToggleOn,
  faTimes,
  faTrash,
  faTrashAlt,
  faWallet
} from '@fortawesome/free-solid-svg-icons'
import DatetimePicker from 'vuetify-datetime-picker'

Vue.use(DatetimePicker)
Vue.use(vuetify)
Vue.use(VueRouter)

registerFontAwesome()
function getRouter() {
  const InverseFutures = require('../src/components/InverseFutures.vue').default
  const routes = [
    {name: 'home', path: "/", component: InverseFutures},
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

  document.title = 'Inverse Futures|Gluon Dapps'
}

function registerFontAwesome() {
  const {FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText} = require('@fortawesome/vue-fontawesome')

  const {library, config} = require('@fortawesome/fontawesome-svg-core')
  // const {fas}             = require('@fortawesome/free-solid-svg-icons')
  const {faEthereum} = require('@fortawesome/free-brands-svg-icons/faEthereum')
  const {faTelegram} = require('@fortawesome/free-brands-svg-icons/faTelegram')
  const {faWeixin} = require('@fortawesome/free-brands-svg-icons/faWeixin')
  const {faTwitter} = require('@fortawesome/free-brands-svg-icons/faTwitter')
  const {faYoutube} = require('@fortawesome/free-brands-svg-icons/faYoutube')
  const {faLinkedin} = require('@fortawesome/free-brands-svg-icons/faLinkedin')
  const {faGithub} = require('@fortawesome/free-brands-svg-icons/faGithub')
  config.autoAddCss = false
  library.add(faEthereum, faTelegram, faWeixin, faTwitter, faYoutube, faLinkedin, faGithub)
  Vue.component('font-awesome-icon', FontAwesomeIcon)
  Vue.component('font-awesome-layers', FontAwesomeLayers)
  Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

  const faMetamask = {
    prefix: 'fac',
    iconName: 'metamask',
    icon: [
      310, 310,
      [],
      null,
      'M 274.1,35.5 L 193,65.8 L 125.6,65.8 L 44.4,35.5 L 31.8,73.4 L 51.3,153.5 L 33.9,207.7 L 50.1,263 L 106.8,247.4 L 117.8,256.4 L 140.1,271.9 L 178.4,271.9 L 200.8,256.4 L 211.8,247.4 L 268.5,263 L 284.8,207.7 L 267.2,153.5 L 286.8,73.4 Z M 138.8,193.5 L 110.6,185.2 L 130.5,176.1 z M 179.7,193.5 L 188,176.1 L 208,185.2 z M 140.6,230.9 L 177.9,230.9 L 180.6,253 L 138.1,253 z'
    ]
  }
  library.add(faMetamask)
  library.add(
    faAngleDoubleDown,
    faAngleDoubleRight,
    faArrowCircleLeft,
    faArrowCircleRight,
    faBell,
    faBellSlash,
    faBolt,
    faBookOpen,
    faCaretLeft,
    faCaretRight,
    faCaretDown,
    faChartLine,
    faCheck,
    faCheckCircle,
    faChevronCircleUp,
    faCircle,
    faCopy,
    faDotCircle,
    faDownload,
    faEdit,
    faExclamation,
    faExclamationTriangle,
    faHistory,
    faInfoCircle,
    faLevelDownAlt,
    faLevelUpAlt,
    faLock,
    faLockOpen,
    faMinus,
    faMinusCircle,
    faMoon,
    faNewspaper,
    faPen,
    faPlayCircle,
    faPlug,
    faPlus,
    faPlusCircle,
    faSadTear,
    faSort,
    faSortAmountDownAlt,
    faSortDown,
    faSpinner,
    faSun,
    faSync,
    faThumbsUp,
    faTimes,
    faToggleOff,
    faToggleOn,
    faTrash,
    faTrashAlt,
    faWallet
  )
}

main()