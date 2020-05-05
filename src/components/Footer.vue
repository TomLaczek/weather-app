<template>
    <v-footer absolute class="pa-0">
        <v-bottom-navigation right>
            <v-spacer></v-spacer>
            <a href="https://www.developer.accuweather.com/apis" target="_blank">
                <v-btn rounded class="ma-2">
                    <v-img class="ma-1" max-width="100px" max-height="20px" :src="this.accuweatherLogo"/>
                    <span>Powered by:</span>
                </v-btn>   
            </a> 
        </v-bottom-navigation>
  </v-footer>
</template>
<script>
export default {
    data:()=>{
        return {
            accuweatherLogo:require("../assets/images/accuLogo.png")
        }
    }
}
</script>