console.log('hello weather...')

// const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";  // LV->KEY
const API_KEY = "3b4de986c4c76bd439f362f5d6890d70";  //OP->KEY


function renderWeatherInfo(data) { 
    let newPara = document.createElement('p');
    newPara.textContent = `${data?.main.temp.toFixed(2)} °C`;

    document.body.appendChild(newPara);
}

async function fetchWeatherInfo() {

    let city = "kolhapur";

    // API call- 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    console.log("api fetched");
    const data = await response.json();

    //printing json obj-
    console.log("weather data:-" , data); //this will print json object.
    console.log("Weather data:-" + JSON.stringify(data));// this will convert json object to string & print.

    renderWeatherInfo(data);

} 

/*
1.create asyc function to fetch API data
2.API call is basically a link we add in to fetch  is simplly a API call.
3.then we convert th fetched data to json format.
->> And we must not keep any extra thing in this function its work must only fetch data ad convert to json format
4.After converting to json format we will call another function that will do further tasks like rendering to UI et.
 */