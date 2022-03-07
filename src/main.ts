import { createApp } from 'vue'
import 'virtual:svg-icons-register';
// import { Form } from 'ant-design-vue'
import App from './app'
import router from './router'
import {initTheme} from './theme/index'

initTheme();
createApp(App).use(router).mount('#app')
