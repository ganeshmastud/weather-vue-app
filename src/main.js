import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import 'font-awesome/css/font-awesome.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'


Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    weatherdetails:[],
    bgImages:{
       'sky':'/assets/sky.jpg',
       'rain':'/assets/rain.jpg',
       'snow':'/assets/snow.jpg',
       'sunny':'/assets/sunny.jpg',
       'clouds':'/assets/clouds.jpg',
        'smoke':'/assets/smoke.jpg',
        'mist':'/assets/mist.jpg',
        'haze':'/assets/haze.jpg'
    }
  },
  getters:{
     getAllCities : (state) => {
       return state.weatherdetails
    },
    getWeather: state =>{
      return state.bgImages
    },
    getAllCitiesByName: state =>{
      let citynames=[]
      state.weatherdetails.forEach(city =>{
        citynames.push(city.name)
      })
      return citynames
    }  
  },
  mutations:{
     addWeatherDetailsForCity: (state, city) =>{
       state.weatherdetails.unshift(city)
    },
    removeCityWithWeatherDetails:(state ,city) =>{
      // state.weatherdetails.forEach(weather=>{
        // if(weather.name === city.name){
          let index = state.weatherdetails.indexOf(city)
          state.weatherdetails.splice(index,1)
        // }
      // })
    } 

  },
  actions:{
    addWeatherDetailsForCity({commit}, city){
      commit('addWeatherDetailsForCity', city)
      
    },
    removeCityWithWeatherDetails({commit},city){
      commit('removeCityWithWeatherDetails',city)
    }
  }
}) 

Vue.config.productionTip = false

new Vue({
  store:store,
  render: h => h(App),
}).$mount('#app')

Vue.use(VueAxios, axios)
