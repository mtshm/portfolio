import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import Autocomplete from "v-autocomplete";
// import VueLodash from 'vue-lodash';
// import _ from 'vue-lodash';
import lodash from "lodash-es";

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
// import "v-autocomplete/dist/v-autocomplete.css";

Vue.config.productionTip = false;
Vue.filter("adjustmentDigit", function (x) {
  return parseFloat(x).toFixed(0);
});

new Vue({
  router,
  store,
  vuetify,
  lodash,
  // Autocomplete,
  // VueLodash,
  render: h => h(App)
}).$mount("#app");
