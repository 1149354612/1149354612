import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button,Swipe, SwipeItem,Popup, } from 'vant';
const app=createApp(App)
app.use(store);
app.use(router);
app.use(Button);
app.use(Swipe);
app.use(SwipeItem);
app.use(Popup);
app.mount('#app');
