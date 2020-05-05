import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    geoLocation:null,
    searchLocaction:null,
    geoBroadcast:null,
    limitError:null
  },
  mutations: {
    SET_GEOLOCATION(state, location){
      state.geoLocation={
        accuracy: location.accuracy,
        latitude: location.latitude,
        longitude: location.longitude
      }
    },
    GET_GEOLOCATION_DATA(state, data){
      state.geoBroadcast = {
        temperature: data.Temperature.Metric.Value,
        icon: data.WeatherIcon,
        text: data.WeatherText,
        day: data.IsDayTime,
        link: data.Link,
      }
    },
    SET_LOCATION_KEY(state, data){
      state.geoLocation.locationKey = data.locationKey;
      state.geoLocation.language = data.language
      state.geoLocation.city = data.city
    },
    SET_ERROR(state, data){
      state.limitError = data
    }
  },
  actions: {
    getGeoLocation({ commit }){
      navigator.geolocation.getCurrentPosition(position => {
        commit("SET_GEOLOCATION", position.coords)
      })
    },
    weatherBroadcastCall({commit}, data){
      let longitude = data.longitude.toFixed(5),
          latitude = data.latitude.toFixed(5);
      const proxy = "https://cors-anywhere.herokuapp.com/"
      const key = 'YOUR_API_KEY'
      const broadcast = `${proxy}https://dataservice.accuweather.com/locations/v1/cities/geoposition/search.json?apikey=${ key }&q=${ latitude }%2C${ longitude }`
      return axios
        .get(broadcast)
        .then(response =>{
          let data = {
            locationKey: response.data.Key,
            language: response.data.Country.ID.toLowerCase(),
            city: response.data.LocalizedName
          }
          commit("SET_LOCATION_KEY",data)
        })
        .catch((response)=>{
          commit("SET_ERROR", response)
        })
    },
    locationCall({ commit }){
      let key = this.state.geoLocation.locationKey;
      let language = this.state.geoLocation.language
      const apikey ='YOUR_API_KEY'
      const proxy = "https://cors-anywhere.herokuapp.com/"
      const weatherCall = `${proxy}https://dataservice.accuweather.com/currentconditions/v1/${ key }.json?apikey=${ apikey }&language=${ language }&details=true`
      return axios
        .get(weatherCall)
        .then(response => {
          commit("GET_GEOLOCATION_DATA",response.data[0])
        })
    }
  },
  modules: {},
  getters:{
    geoLocation(state){
      return state.geoLocation;
    },
    locationKey(state){
      return state.geoLocation.locationKey;
    },
    limitError(state){
      return state.limitError;
    },
    geoBroadcast(state){
      return state.geoBroadcast;
    }
  }
});
