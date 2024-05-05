// import Vue from 'vue';
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

// import 'vue-toast-notification/dist/theme-default.css';
// import { useToast } from 'vue-toast-notification';
// import VueToast from 'vue-toast-notification';

// import Toast from "vue-toastification";
// import "vue-toastification/dist/index.css";

import Toaster from '@meforma/vue-toaster';

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import './assets/css/main.css';

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
// import moment from 'moment';

// Vue.config.productionTip = false
// Vue.filter('formatDate', function(value) {
//   if (value) {
//     return moment(String(value)).format('MM/DD/YYYY')
//   }
// });

// Vue.use(VueToast);
// Vue.use(BootstrapVue)
// Vue.use(BootstrapVueIcons)


createApp(App)
  .use(router)
  .use(store)
  .use(Toaster)
  // .use(useToast)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

