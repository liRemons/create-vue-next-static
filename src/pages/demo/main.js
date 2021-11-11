import { createApp } from "vue";
import App from "./App";
import ElementPlus from "element-plus";
import store from './store'

const app = createApp(App);
app.use(ElementPlus);
app.use(store)
app.mount("#container");
