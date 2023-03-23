import { createApp } from 'vue';
import App from './app.vue';
import fe from 'fe-ui';

const app = createApp(App);
app.use(fe);

app.mount('#app');
