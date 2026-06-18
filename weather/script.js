// ================= WEATHER FUNCTION =================

async function getWeather() {

    let city =
    document.getElementById("cityInput").value.trim();

    if(city === ""){

        alert("Enter city name");

        return;
    }

    showLoader();

    try {

        let url =
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

        let res = await fetch(url, {

            cache: "no-cache"
        });

        let data = await res.json();

        if(data.cod != "200"){

            alert("Error: " + data.message);

            return;
        }

        let current = data.list[0];

        // ================= WEATHER ICON =================

        let icon = current.weather[0].icon;

        let iconUrl =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;

        document.getElementById("weatherIcon").src =
        iconUrl;

        // ================= WEATHER DATA =================

        document.getElementById("cityName").innerText =
        data.city.name;

        document.getElementById("temp").innerText =
        "Temp: " + current.main.temp + "°C";

        document.getElementById("desc").innerText =
        current.weather[0].description;

        document.getElementById("humidity").innerText =
        "Humidity: " + current.main.humidity + "%";

        document.getElementById("wind").innerText =
        "Wind: " + current.wind.speed + " km/h";

        // ================= THEME =================

        changeTheme(current.weather[0].main);

        // ================= WEATHER CONDITION =================

        let condition =
        current.weather[0].main.toLowerCase();

        // ================= WEATHER SUGGESTION =================

        if(condition.includes("rain")){

            document.getElementById("suggestion").innerText =
            "☔ Carry Umbrella";

            document.getElementById("mood").innerText =
            "🌧 Perfect day for coffee";
        }

        else if(condition.includes("clear")){

            document.getElementById("suggestion").innerText =
            "😎 Great Weather for Travel";

            document.getElementById("mood").innerText =
            "☀ Enjoy your day";
        }

        else if(condition.includes("cloud")){

            document.getElementById("suggestion").innerText =
            "☁ Pleasant Weather";

            document.getElementById("mood").innerText =
            "🌥 Calm and cool weather";
        }

        else{

            document.getElementById("suggestion").innerText =
            "🌡 Stay Safe";

            document.getElementById("mood").innerText =
            "✨ Have a nice day";
        }

        // ================= TRAVEL SUGGESTION =================

        if(current.main.temp < 15){

            document.getElementById("travel").innerText =
            "🏔 Great weather for mountains";
        }

        else{

            document.getElementById("travel").innerText =
            "🏖 Perfect beach weather";
        }

        // ================= FORECAST =================

        displayForecast(data);

        clearInput();

    }

    catch(err){

        handleError();
    }
}


// ================= FORECAST =================

function displayForecast(data) {

    let forecastDiv =
    document.getElementById("forecast");

    if(!forecastDiv) return;

    forecastDiv.innerHTML = "";

    for(let i = 0; i < data.list.length; i += 8){

        let day = data.list[i];

        let date =
        new Date(day.dt_txt).toDateString();

        let temp =
        Math.round(day.main.temp);

        let desc =
        day.weather[0].description;

        forecastDiv.innerHTML += `

        <div class="forecast-card">

            <h4>${date}</h4>

            <p>🌡 ${temp}°C</p>

            <p>☁ ${desc}</p>

        </div>
        `;
    }
}


// ================= LOCATION =================

function getLocation() {

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(

        async position => {

            try{

                let lat =
                position.coords.latitude;

                let lon =
                position.coords.longitude;

                let url =
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

                let res = await fetch(url);

                let data = await res.json();

                // ================= ICON =================

                let icon =
                data.weather[0].icon;

                let iconUrl =
                `https://openweathermap.org/img/wn/${icon}@2x.png`;

                document.getElementById("weatherIcon").src =
                iconUrl;

                // ================= WEATHER DATA =================

                document.getElementById("cityName").innerText =
                data.name;

                document.getElementById("temp").innerText =
                "Temp: " + data.main.temp + "°C";

                document.getElementById("desc").innerText =
                data.weather[0].description;

                document.getElementById("humidity").innerText =
                "Humidity: " + data.main.humidity + "%";

                document.getElementById("wind").innerText =
                "Wind: " + data.wind.speed + " km/h";

                // ================= THEME =================

                changeTheme(data.weather[0].main);

            }

            catch (err) {
    console.log(err);
    alert(err.message);
}
            

        },

        () => {

            alert("Location denied");
        });

    }

    else{

        alert("Location not supported");
    }
}


// ================= THEME =================

function changeTheme(weather) {

    let box =
    document.getElementById("weatherBox");

    box.classList.remove(
    "sunny",
    "cloudy",
    "rainy",
    "night"
    );

    weather = weather.toLowerCase();

    // ================= SUNNY =================

    if(weather.includes("clear")){

        box.classList.add("sunny");

        document.body.style.backgroundImage =
        "url('https://wallpaperaccess.com/full/1540001.jpg')";
    }

    // ================= CLOUDY =================

    else if(weather.includes("cloud")){

        box.classList.add("cloudy");

        document.body.style.backgroundImage =
        "url('https://wallpaperaccess.com/full/17520.jpg')";
    }

    // ================= RAINY =================

    else if(weather.includes("rain")){

        box.classList.add("rainy");

        document.body.style.backgroundImage =
        "url('https://wallpaperaccess.com/full/121417.jpg')";
    }

    // ================= NIGHT =================

    else{

        box.classList.add("night");

        document.body.style.backgroundImage =
        "url('https://wallpaperaccess.com/full/31189.jpg')";
    }
}


// ================= GREETING =================

function showGreeting(){

    let hour = new Date().getHours();

    let msg = "Hello";

    if(hour < 12){

        msg = "Good Morning";
    }

    else if(hour < 18){

        msg = "Good Afternoon";
    }

    else{

        msg = "Good Evening";
    }

    console.log(msg);
}

showGreeting();


// ================= ERROR =================

console.log(err);
alert("API Error");


// ================= LOADER =================

function showLoader(){

    console.log("Loading...");
}


// ================= CLEAR INPUT =================

function clearInput(){

    document.getElementById("cityInput").value = "";
}


// ================= QUICK WEATHER =================

function quickWeather(city){

    document.getElementById("cityInput").value =
    city;

    getWeather();
}


// ================= SECRET MODE =================

document.addEventListener("keydown", function(e){

    if(e.key === "a"){

        document.body.style.filter =
        "hue-rotate(90deg)";
    }
});


// ================= EXTRA FUNCTIONS =================

function f1(){console.log("f1")}
function f2(){console.log("f2")}
function f3(){console.log("f3")}
function f4(){console.log("f4")}
function f5(){console.log("f5")}
function f6(){console.log("f6")}
function f7(){console.log("f7")}
function f8(){console.log("f8")}
function f9(){console.log("f9")}
function f10(){console.log("f10")}


// ================= LOOP =================

for(let i = 0; i < 120; i++){

    console.log("Line:", i);
}