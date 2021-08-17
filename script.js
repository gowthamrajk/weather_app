
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

let weather = 
{
    apiKey: "67b92f0af5416edbfe58458f502b0a31",
    fetchWeather: function (city) 
    {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+this.apiKey
      )
        .then((response) => 
        {
          if (!response.ok) 
          {
            modal.style.display = "block";
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) 
    {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, temp_min, temp_max, feels_like, pressure, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Climate at " + name;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".temp_min").innerText = temp_min + "°C";
      document.querySelector(".temp_max").innerText = temp_max + "°C";
      document.querySelector(".feels_like").innerText = feels_like + "°C";
      document.querySelector(".pressure").innerText = "Wind Pressure: " +  pressure + " psf";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + " %";
      document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () 
    {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () 
  {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) 
    {
      if (event.key == "Enter") 
      {
        weather.search();
      }
    });

$(".close").click(function(){
  modal.style.display = "none";
});

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
