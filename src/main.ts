import './assets/main.css'
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVfm } from 'vue-final-modal'
import Notifications from 'notiwind'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
const vfm = createVfm()

pinia.use(piniaPluginPersistedState)
app.use(pinia)
app.use(router)
app.use(Notifications)
app.use(vfm)

app.mount('#app')
