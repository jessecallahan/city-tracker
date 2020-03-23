export class WeatherService {
    async getWeatherByCity(city) {
        try {
            let response = await fetch(`https://developers.zomato.com/api/v2.1/search?q=${city}&apikey=a2c150d8509102fc9c1aa7084c73cfad`);
            // let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=acd1196ba2169878e1449978dc3cdda4`);
            let jsonifiedResponse;
            if (response.ok && response.status == 200) {
                jsonifiedResponse = await response.json();
            } else {
                jsonifiedResponse = false;
            }
            return jsonifiedResponse;
        } catch {
            return false;
        }
    }
}