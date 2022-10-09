import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCheck,
  faXmark,
  faStopwatch,
  faUtensils,
  faFireFlameCurved,
  faPizzaSlice,
  faBook,
  faCheckSquare,
  faTrashCan,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./components/RecettesApp.vue";

// import "./assets/welcome/main.css";

// Setup Font Awesome icons
library.add(faCheck);
library.add(faXmark);
library.add(faStopwatch);
library.add(faUtensils);
library.add(faFireFlameCurved);
library.add(faPizzaSlice);
library.add(faBook);
library.add(faCheckSquare);
library.add(faTrashCan);
library.add(faAngleLeft);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
