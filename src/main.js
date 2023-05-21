import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { createPinia } from 'pinia'

const app = createApp(App)
const pina = createPinia()

app.use(router)
app.use(pina)

app.mount('#app')