<template>
  <div class="home">
    <v-container>
      <v-row class="justify-center align-center mb-3">
        <h1 class="">{{ title }}</h1>
      </v-row>
      <v-row class="justify-center align-center mt-3">
        <v-col cols="12" sm="12" md="6">
          <v-row class="justify-center align-center">
            <v-btn text outlined rounded large @click="checkWeather">
              <span>{{ button }}</span>
              <v-icon right>filter_drama</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-snackbar v-model="navigatorFail">
        {{ navigatorSnacText }}
        <v-btn
            color="#76EB6C"
            text
            timeout="1500"
            @click="navigatorFail = false"
        >
            Close
        </v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data:()=>{
    return{
      title:'Weather conditions based on your location',
      subtitle:'',
      button:'Check Weather',
      navigatorFail:false,
      navigatorSnacText:'You have denied access to your localization..',
    }
  },
  methods:{
    checkWeather(){
      navigator.geolocation.getCurrentPosition(()=>{
        this.$router.push({name:'Weather'})
      }, ()=>{
        this.navigatorFail = true
      })
    }
  }
};
</script>
