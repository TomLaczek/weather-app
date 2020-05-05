<template>
  <div class="weather">
    <v-container>
       <v-row v-if="loader" class="justify-center align-center my-0 py-0">
        <v-col cols="12" sm="4">
          <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            rounded
            color="grey darken-2"
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-row v-if="limitError!=null" class="justify-center aling-center">
        <h2>Sorry, something went wrong. Try again later..</h2>
      </v-row>
      <v-row v-if="this.geoBroadcast!=null" class="justify-center align-center">
        <v-col cols="12" sm="6">
          <v-row class="justify-center align-center">
            <span class="display-1 mb-1 font-weight-medium">{{ this.geoLocation.city }}</span>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-if="this.geoBroadcast!=null" class="justify-center align-center absolute">
        <v-col cols="12" sm="6">
          <v-row class="justify-end align-center">
            <v-img max-width="150px" :src="require(`../assets/images/accuIcons/${this.geoBroadcast.icon}-s.png`)"></v-img>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-if="this.geoBroadcast!=null" class="justify-center align-center">
        <v-col cols="12" sm="6">
          <v-row class="justify-center align-center">
            <span class="display-4 mb-1 font-weight-medium">{{ this.geoBroadcast.temperature }}{{ degree }}</span>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-if="this.geoBroadcast!=null" class="justify-center align-center">
        <v-col cols="12" sm="6">
          <v-row class="justify-center align-center">
            <span class="subtitle-1 my-1 font-weight-medium">{{ this.geoBroadcast.text }}</span>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name:'localWeather',
  data:()=>{
    return{
      loading:false,
      loader:false,
      icon:require(`../assets/images/accuIcons/1-s.png`),
      degree:"\u00B0",
      text:"dupa",
      city:"dupy dwie",
      temperature:"99"
    }
  },
  computed:{
    geoLocation(){
      return this.$store.getters.geoLocation
    },
    locationKey(){
      return this.$store.getters.locationKey
    },
    limitError(){
      return this.$store.getters.limitError
    },
    geoBroadcast(){
      return this.$store.getters.geoBroadcast
    }
  },
  mounted(){
    this.gainWeatherConditions()
  },
  methods:{
    gainWeatherConditions(){
      if(this.geoLocation===null){
        if(navigator.geolocation){
          this.$store.dispatch('getGeoLocation')
        }
      } else{
        this.loader = true;
        this.loading = true;
        this.$store.dispatch('weatherBroadcastCall', this.geoLocation)
        .then(()=>{
            this.$store.dispatch("locationCall")
        })
        .then(()=>{
            this.loading=false;
            this.loader=false;
        })
      }
    }
  }
}
</script>
