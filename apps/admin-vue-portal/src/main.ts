import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

async function bootstrap(){
    const app = createApp(App);


    app.mount("#app")
}

bootstrap();