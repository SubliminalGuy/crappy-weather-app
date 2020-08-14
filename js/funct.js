console.clear();

$(document).ready(function() {
 
 var latitudeWert = "";
 var longitudeWert = ""; 
 var weatherIconURL;
 var correctedUnit;
 var weatherIcon;
 var temperatur;
  
$("#weatherbutton").on("click", function(){
 
 // Prüft und holt die Daten für Longitude und Latitude (Location Services)
  
  if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function(position) {

latitudeWert = position.coords.latitude;
longitudeWert = position.coords.longitude;  

 var weatherRepository = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitudeWert + "&lon=" + longitudeWert;
  
 // Holt die Wetterdaten von fcc-Weather
  
  $.getJSON(weatherRepository, function(val) {
    
   temperatur = val.main["temp"];
    
   // Prüft ob die Fahrenheit-Checkbox aktiv ist und ändert entsprechend den Wert und die Einheit
    
    if(document.getElementById('fahrenheitCheck').checked) {
  correctedUnit = temperatur * 9;
  correctedUnit/=5;
  correctedUnit+=32;
  temperatur = correctedUnit + "°F";    
    }
    else {
  temperatur = val.main["temp_min"] + "°C";
};    
  
    var cityAddress = val["name"] + ", " + val.sys["country"];
    
 // Checkt die Objekteigenschaften auf eine valide Wettergrafik oder Icon-ID   
    
   if (val.weather[0].icon) {
     weatherIcon = val.weather[0].icon;
     weatherIconURL = "<img src= '" + weatherIcon + "'>";
     }
    else if (val.weather[1].icon) {
      weatherIcon = val.weather[1].icon;
    weatherIconURL = "<img src= '" + "https://openweathermap.org/img/w/" + weatherIcon + ".png" + "'>";
     } 
    else {
      weatherIcon = val.weather[2].icon;
    weatherIconURL = "<img src= '" + "https://openweathermap.org/img/w/" + weatherIcon + ".png" + "'>";
      };
    
    // Setzt die Wetterbeschreibung aus den API-Daten auf eine Variable 
    var weatherDescription = val.weather[0].description;
    
    // Gibt Temperatur, Icon, Wetterbeschreibung und Location aus 
    
   $(".weather").html(temperatur + "<br>" + weatherIconURL + "<br>" + weatherDescription);
   $(".message").html(cityAddress);
   
  });  // schliesst die getJSON function
  
}); // schliesst die Navigatorfunktion

 } // schliesst die Bedingungsprüfung für Location Services
  
  else if (!navigator.geolocation) {
    $(".weather").html("Geolocation not supported");
    $(".message").html("Geolocation not supported");
};    
  
   });   // schliesst Get Weather function
    }); // schliesst document ready function