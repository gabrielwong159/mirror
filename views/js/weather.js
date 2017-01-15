var animations = ['sleet','sleet','sleet','sleet','sleet','snow','snow','snow','snow','rain','snow','rain','rain','snow','snow','snow','snow','sleet','sleet','fog','fog','fog','fog','wind','wind','cloudy','cloudy','partly-cloudy-night','partly-cloudy-day','partly-cloudy-night','partly-cloudy-day','clear-night','clear-day','clear-night','clear-day','sleet','clear-day','sleet','sleet','sleet','rain','snow','snow','snow','partly-cloudy-day','sleet','snow','sleet'];

function updateWeather() {
	$.simpleWeather({
		location: '',
		//woeid: '1062406',
		woeid: '24703080',
		unit: 'c',
		
		success: function(weather) {
			var skycons = new Skycons({"color": "white"});

			var htmlString = '<canvas id="weather-icon" width="128" height="128"></canvas><h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
			htmlString+= '<div id="region">SUTD, '+weather.city+'</div>';
			htmlString+= '<div>'+weather.currently/*+ ' Weather | Sunset ' +weather.sunset*/+ '</div>';
			htmlString+= '<div>Humidity ' +weather.humidity+ '%\</div>';
			document.getElementById("weather").innerHTML = htmlString;

			skycons.remove("weather-icon")
			skycons.add("weather-icon", animations[parseInt(weather.code)]);
            skycons.play();
		},
		error: function(error) {
			var htmlString = '<p>' + error + '</p>';
			document.getElementById("weather").innerHTML = htmlString;
		}
	});
};
        
$(document).ready(function() {
	updateWeather();
	setInterval(updateWeather, 300000);
});