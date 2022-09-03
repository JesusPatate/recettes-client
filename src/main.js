import { createApp } from "vue";
import { createPinia } from "pinia";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import App from "./components/RecettesApp.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";

// import "./assets/welcome/main.css";

// Setup Font Awesome icons
library.add(faCheck);
library.add(faXmark);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
