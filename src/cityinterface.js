import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { RestNumService } from './restaurantnum-service.js';
import { RestService } from './restaurant-service.js';
import { WeatherService } from './../src/weather-service.js';

$(document).ready(function () {

    $('#weatherLocation').click(function () {
        const city = $('#location').val();
        $('#location').val("");
        //gets location by keyword
        (async () => {
            let restNumService = new RestNumService();
            const response = await restNumService.getRestaurantNumberByCity(city);
            getElements(response);
        })();
        //gets restaurant id number
        function getElements(response) {
            const city1 = response.location_suggestions[0].city_id;
            const cityName1 = response.location_suggestions[0].city_name;
            console.log(city1);
            //gets restuarant suggestions
            if (response) {
                (async () => {
                    let weatherService1 = new RestService();
                    const response2 = await weatherService1.getRestByNum(city1);
                    getElements(response2);
                    console.log(response2.restaurants);
                })();

                function getElements(response2) {
                    $("#showRestaurant").html('');
                    $("#showRestaurant1").html('');
                    $('#showRestaurant').html("Good restaurants in " + `${cityName1}` + " are:");
                    response2.restaurants.forEach(element =>
                        $('#showRestaurant1').append("<a target='_blank' href=" + element.restaurant.url + ">" + element.restaurant.name + "</a>" + ", "));
                    $('#showRestaurant1').show();
                }
            } else {
                $('.errors').text(`There was an error handling your request.`);
            }
        }
        //promise all allows us to add promises
        Promise.all([RestService, RestNumService]).then(function (values) {
            console.log(values);

            // weather api
            (async () => {
                let weatherService = new WeatherService();
                const response3 = await weatherService.getWeatherByCity(city);
                getElements(response3);
            })();

            function getElements(response3) {
                if (response3) {
                    $('.showHumidity').text(`The humidity in ${city} is ${response3.main.humidity}%`);
                    $('.showTemp').text(`The temperature in Fahreinheit is ${((response3.main.temp - 273.15) * (9 / 5) + 32).toFixed(1)} degrees with ${response3.weather[0].description}`);
                } else {
                    $('.showHumidity').text(`There was an error handling your request.`);
                    $('.showTemp').text(`Cant find info on weather in this area!`);
                }
            }
        });
    });
});
