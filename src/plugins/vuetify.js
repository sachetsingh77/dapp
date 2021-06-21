import Vue from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import Vuetify, {
    VApp,
    VContainer,
    VContent,
    VAppBar,
    VToolbarTitle,
    VRow,
    VCol,
    VCard,
    VIcon,
    VCardText,
    VCardTitle,
    VToolbar
} from 'vuetify/lib'


Vue.use(Vuetify, {
    components: {
        VApp,
        VContainer,
        VContent,
        VAppBar,
        VToolbarTitle,
        VRow,
        VCol,
        VCard,
        VIcon,
        VCardText,
        VCardTitle,
        VToolbar
    },
    directives: {},
})

const opts = {icons: {
    iconfont: 'fa',
  },}
export default new Vuetify(opts)