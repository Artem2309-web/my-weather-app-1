 // Variables
 let map;
 let weatherMarker;

 // initializeMap
 function initializeMap(lat, lon) {
   if (!map) {
     map = L.map('map').setView([lat, lon], 10);
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 20,
      minZoom: 2,
      tileSize: 512,
      zoomOffset: -1
  }).addTo(map);
   } else {
     map.setView([lat, lon], 10);
   }

   if (weatherMarker) {
     weatherMarker.remove()
   }
 }
 
 // getWeatherIcon
 function getWeatherIcon(id) {
   if (id === 800) return '☀️';
   if (id >= 200 && id <= 232) return '⛈';
   if (id >= 300 && id <= 321) return '🌦';
   if (id >= 500 && id <= 531) return '🌧';
   if (id >= 600 && id <= 622) return '🌨';
   if (id >= 701 && id <= 781) return '💨';
   if (id >= 801 && id <= 804) return '☁️';
   return '⭐️';
 }

 // getWeather
 function getWeather() {
   const city = document.getElementById('cityInput').value;
   const apiKey = '368983b1124eff3a788c7f9aa6b4f112';
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${apiKey}`;

   fetch(url)
     .then(response => response.json())
     .then(data => {
       if (data.cod === 200) {
         const weatherIcon = getWeatherIcon(data.weather[0].id);

         document.getElementById('weatherInfo').innerHTML = `
           <p><strong>Город:</strong> ${data.name}</p>
           <p><strong>Температура:</strong> ${data.main.temp} °С</p>
           <p><strong>Погода:</strong> ${data.weather[0].description} ${weatherIcon}</p>
           <p><strong>Влажность:</strong> ${data.main.humidity} %</p>`;

         initializeMap(data.coord.lat, data.coord.lon);
         weatherMarker = L.marker([data.coord.lat, data.coord.lon])
           .addTo(map)
           .bindPopup(`Погода: ${data.weather[0].description} ${weatherIcon}`)
           .openPopup();
       } else {
         document.getElementById('weatherInfo').innerHTML = `<p>Город не найден</p>`;
       }
     }).catch(() => {
       document.getElementById('weatherInfo').innerHTML = `<p>Ошибка получения данных</p>`;
     })
 }