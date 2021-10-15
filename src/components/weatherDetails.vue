<template>
    
    <div clas="d-flex  justify-content-center flex-row">
        <!-- <img src="/assets/clouds.jpg" alt=""> -->
        <h1>Weather Details</h1>
        <input type="text" class="input-search" name="search" v-model="search" id="search">
        <button @click="searchWeatherDetails">search city</button>
        <!-- <img src="../assets/rain.jpg" alt="rain"> -->
        <div class=" d-flex col-4 mx-auto mt-3  justify-content-center flex-column">
            <div class="shadow-sm  bg-light box weather-container col-12 pl-0 pr-0 mb-3 d-flex flex-row " 
             v-for="weather,idx in getAllCities" :key="idx">
            <!-- {{weather.icon}} -->
                <div class="icon col-3 mx-auto pt-3">
                    <img class="icon-img" :src="weather.icon" :alt="weather.icon">
                </div>
                <div class="weather-detail col-9 bg-img" :style=" 'background-image:url('+weather.imgpath+')'">
                    <!-- <img class="bg-img" :src="weather.imgpath" width="100px" height="100px" :alt="weather.imgpath"> -->
                    <div class="cntr" :style="weather.main =='Rain' || weather.main =='Mist'? bgcolr: {'color':'red'}">
                        <div class="sub-cntr clearfix">
                            <h4 class="city-name float-start">{{weather.name}} </h4>
                            <h6 class="weather-descr"> {{weather.description}}</h6>

                        
                            <div class ="temperature-dtls">
                                <h6 class="temp float-start">{{weather.temp}} &deg; <span class="celcius">C</span>  </h6>
                                
                            <span class="min-temp"
                            :style="weather.main =='Rain' || weather.main =='Mist'? {'color':'red'}:{'color':'red'}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                    </svg>
                                    {{weather.min_temp}} &deg; <span class="celcius">C</span></span>
                            <span class="max-temp"
                             :style="weather.main =='Rain' || weather.main =='Mist'? {'color':'red'}:{'color':'red'}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                    </svg>  {{weather.max_temp}} &deg; <span class="celcius">C</span></span>
                            </div>
                            
                        </div>
                    
                        
                    
                        <h6 class="" style="text-align:left"> wind speed {{weather.wind_speed}}</h6>
                    </div>
                    <div class="close" @click="remove_city(weather)"> <span>X</span></div>
                                           
                </div>
               
             
           
            
            
            
            </div>
        </div>
        
       <!-- <div >Getters {{getAllCities}}</div> -->
    </div>
</template>

<script>
import axios from 'axios'
export default {

    name:'weatherDetails',
    data(){
        return{
            info:null,
            search:"",
            apikey:'68a5f10c3ab0b551d1c6f5d33dd448ea',
            weatherdetails:[],
            bgcolr:{
                'color': '#b1facc'
            }

        }
    },
    computed:{
        getAllCities (){
            //  console.log('from getters ',this.$store.getters.getAllCities);
             return this.$store.getters.getAllCities
        },
        getAllCitiesByName(){
            return this.$store.getters.getAllCitiesByName
        },
        getWeather(){
            return this.$store.getters.getWeather
        },
        
        
    },
    // created(){
    //     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.search}&appid=${this.apikey}`)
    //     .then(resp => this.info = resp.data);
    //     console.log("data ",this.info);
    // },
    methods:{
        loadimg(path){
            return path
        },
        remove_city(weather){
            this.$store.dispatch('removeCityWithWeatherDetails',weather);
        },
        // searchforcity:  searchforcity(){
        //     console.log("cool");
        // }
        // storeicon(icon){
        //     const fs = require('fs');
        //         let path ='./assets/'+icon+'.png';
        //         let writeStream = fs.createWriteStream(path);

        //         // write some data with a base64 encoding
        //         writeStream.write(icon, 'base64');

        //         // the finish event is emitted when all data has been flushed from the stream
        //         writeStream.on('finish', () => {
        //             console.log('wrote all data to file');
        //         });
        //         // close the stream
        //         writeStream.end();
        // },
        getImagePath(weather_description){
            // alert(this.getWeather);
            let path ='';
             Object.keys(this.getWeather).forEach(weather => {
                // console.log(weather);
                if(weather_description.includes(weather)){
                    // console.log("includes weather");
                    path = this.getWeather[weather];
                    console.log(this.getWeather[weather]);
                    // console.log("path 2",path);

                }
            })
            
            return path
        },
        searchWeatherDetails(){
            console.log("all cities ",this.getAllCitiesByName);
            if(this.getAllCitiesByName.length > 0 &&  this.getAllCitiesByName.includes(this.search) ){
                alert("city is already present");
                
                // console.log("data ",this.info);
            } else if(this.search.length <= 0 ){
                alert("enter something to search");
            }
            else{
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.search}&appid=${this.apikey}`)
                .then(resp => {
                    console.log('resp ',resp.data);
                    let city_weather ={};
                    city_weather.name = resp.data.name;
                    city_weather.main = resp.data.weather[0].main;
                    city_weather.description = resp.data.weather[0].description;
                    city_weather.icon = resp.data.weather[0].icon;
                    city_weather.icon+='.png';
                    city_weather.icon ="http://openweathermap.org/img/w/"+city_weather.icon;
                    // this.storeicon(city_weather.icon)
                    city_weather.temp = resp.data.main.temp;
                    city_weather.min_temp = resp.data.main.temp_min;
                    city_weather.max_temp = resp.data.main.temp_max;
                    city_weather.wind_speed = resp.data.wind.speed;
                    city_weather.name = city_weather.name.toLowerCase();
                    city_weather.imgpath = this.getImagePath(city_weather.description);
                    this.weatherdetails.push(city_weather);
                    this.$store.dispatch('addWeatherDetailsForCity',city_weather);
                    console.log('weather ',this.weatherdetails);
                } ).catch(error => alert(error.message));
            }
            this.search="";
        }
    }
}
</script>


<style scoped>
    #search{
        margin-right:1em;
    }

/* .city-name{
    display: inline;
} */
.icon{
    padding:0;
}
.city-name,.weather-descr, .temp{
    text-align:left;
}
.temp, .min-temp, .max-temp{
    display: inline-block;
    text-align:left;
    float:left;
}
/* span{
    display: inline-block;
    font-size: .5em;
    text-align:left;
} */
.celcius{
    font-size: .8em;
    margin-bottom:1em;
}
.min-temp, .max-temp{
    margin-left:.3em;
    /* padding-top:.5em; */
    padding-right:.3em;
    font-size: .7em;
    margin-top:.2em;
    background-color: #b1facc;
    border-radius: .2em;

}

/* .wind{
    display: inline;
    border:1px solid grey;
} */
h4,h6{
    padding: 0;
    margin: 0;
}
.wind-speed h6{
    display:inline-block;
    /* text-align: left; */
    /* padding-left:3em; */
    /* float: left; */
    
}
.box {
  box-shadow:
  0 1.8px 1.2px rgba(0, 0, 0, 0.034),
  0 4.7px 3.3px rgba(0, 0, 0, 0.048),
  0 6.5px 7px rgba(0, 0, 0, 0.06),
  0 12.3px 11.9px rgba(0, 0, 0, 0.072),
  0 21.8px 23.4px rgba(0, 0, 0, 0.086),
  0 50px 40px rgba(0, 0, 0, 0.12)
;
}
.bg-img{ 
    opacity: .8;
  background-position: center;  /* Center the image */ /* Do not repeat the image */ 
  background-repeat: no-repeat;  
  
   background-size: cover;
   position: relative;
}
.cntr{
    color:rgb(150, 14, 14);
    position:relative;
}
.close{
    color:red;
    position: absolute;
    top:0;
    padding:.2em;
    font-size:1.3em;
    right:0;
    background-color: white;
}
.close:hover{
    color:black;
     font-size:1.4em;
     padding:.3em;
    background-color: lightgrey;
}

</style>