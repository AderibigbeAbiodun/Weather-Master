//
document.querySelector("#searchbtn").addEventListener('click', function(){

	var searchbox = document.querySelector("#searchbox").value;
	var resultbox = document.querySelector(".result-box");

	if (searchbox == '') {
		alert("Enter your location");
	}else{

		var apiKey = '2c52e59d37b6bfa37185ffa9186846e3';
		var url = `http://api.openweathermap.org/data/2.5/weather?q=${searchbox}&appid=${apiKey}`;

		resultbox.innerHTML = `
				<div style="padding: 50px 0 0 0; font-family: sans-serif;">
					We are processing your weather...
				</div>`;

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);

				var lon = data.coord.lon;
				var lat = data.coord.lat;
				var icon = data.weather[0]['icon'];
				var description = data.weather[0]['description'];
				var maxtemp = data.main.temp_max;
				var mintemp = data.main.temp_min;
				var pressure = data.main.pressure;
				var humidity = data.main.humidity;
				var country = data.sys.country;
				var cityname = data.name;
				var status = data.cod;
				if (status == 200) {

			resultbox.innerHTML = `

			<div class="result-left">
				
				<div class="result-left-title">Weather result for: <strong>${cityname}</strong>
					<img src="http://openweathermap.org/img/wn/${icon}@2x.png" style="width: 20px; height: 20px;">
				</div>

				<table class="result-table">
					<tr><td>City:</td> <td>${cityname}</td></tr>
					<tr><td>Humidity:</td> <td>${humidity}</td></tr>
					<tr><td>Pressure:</td> <td>${pressure}</td></tr>
					<tr><td>Min Temprature</td> <td>${Math.floor(mintemp-273.15)}&#8451;</td></tr>
					<tr><td>Max Temprature:</td> <td>${Math.floor(maxtemp-273.15)}&#8451;</td></tr>
					<tr><td>Country:</td> <td>${country}</td></tr>
					<tr><td>Description:</td> <td>${description}</td></tr>
				</table>

			</div>

			<div class="result-right">
				<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=@${lat},${lon}&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><style>.mapouter{position:relative;text-align:right;height:300px;width:100%;}</style><style>.gmap_canvas {overflow:hidden;background:none!important;height:300px;width:100%;}</style></div></div>
			</div>

			`;



				}
			}else if(this.status == 404){
				console.log("City no found");
			}
		};
		xhttp.open("GET", url, true);
		xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhttp.send("");

	}

});