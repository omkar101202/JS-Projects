
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAcessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector(".form-container");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
 
//
getfromSessionStorage(); 

//tab switching function
function switchTab (newTab) {
    if (newTab != oldTab){
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        //if searchForm doesnot contain class then we have to make it
        if(!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAcessContainer.classList.remove("active");
            searchForm.classList.add("active");
            
        }
        else{
            //means we were on search tab and now switch to your weather tab
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //now i am in weather tab so i have to display weather of the current location & in local storage we have saved the coordinates
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    // pass clicked tab as input parameter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    // pass clicked tab as input parameter
    switchTab(searchTab);
});


//check if coordinates are present in local storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    
    if(!localCoordinates) {
        //if not present then display grant-Acess location window
        grantAcessContainer.classList.add("active");
        
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
          
    }

}

async function fetchUserWeatherInfo(coordinates) {
    const {lat , lon} = coordinates;
    //make grantcontainer invisible
    grantAcessContainer.classList.remove("active");
    //make grantcontainer invisible
    loadingScreen.classList.add("active");

    //api call
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        //this function to take data from api call & display on  UI
        renderWeatherInfo(data);
    }
    catch(e){
        loadingScreen.classList.remove("active");
        //see->
    }

}


function renderWeatherInfo(weatherInfo) {
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //fetch weather info from response object and display it on UI
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText = weatherInfo?.clouds?.all;

}

const grantAcessButton = document.querySelector("[data-grantAccess]");

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        //show alert for no geolocation support.

    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates" , JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

grantAcessButton.addEventListener("click",getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === ""){
        return;
    }
    else{
        fetchSearchWeatherInfo(cityName);
        console.log("search callled");
    }

})

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAcessContainer.classList.remove("active");

    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");

        renderWeatherInfo(data);
        console.log("rendered");
    }
    catch(err){
        //handle error
    }
}
