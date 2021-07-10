import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import vueDebounce from 'vue-debounce'


import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: routes
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  ModalPlugin,
  FormDatepickerPlugin,
  TimePlugin

} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  ModalPlugin,
  FormDatepickerPlugin,
  TimePlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);


Vue.use(vueDebounce)

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);  
axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  // username: "hilla",
  favorites: undefined,
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    this.username = undefined;
    this.favorites = undefined
  }
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

export const bus = new Vue()

new Vue({
  router,
  data() {
    return {
      store: shared_data
    };
  },
  methods: {

    async getAllTeams(){
      const response =  await this.axios.get("http://localhost:3000/teams/allTeams",); 
      // console.log(response)           
      localStorage.setItem('allTeams', JSON.stringify(response.data));
    },

    async getAllPlayers(){
      const response = await this.axios.get("http://localhost:3000/player/allPlayers")           
      localStorage.setItem('allPlayers', JSON.stringify(response.data));
   
    },

    async getLeagueDetails(){
      const response = await this.axios.get("http://localhost:3000/league/getDetails")           
      localStorage.setItem('leagueDetails', JSON.stringify(response.data));
    },

    async getCurStage(){
      const response = await this.axios.get("http://localhost:3000/league/getCurStage")           
      localStorage.setItem('curStage', JSON.stringify(response.data));
    },    

    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    },  

  },

  created(){
    console.log("app created")
    this.getAllPlayers(), 
    this.getAllTeams(),
    this.getCurStage(),
    this.getLeagueDetails()
  },

  render: (h) => h(App),



  
}).$mount("#app");
