export class RestService {
  async getRestByNum(city1) {
    try {
      let response2 = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${city1}&entity_type=city&establishment_type=restaurant&apikey=a2c150d8509102fc9c1aa7084c73cfad`);
      // let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=acd1196ba2169878e1449978dc3cdda4`);
      let jsonifiedResponse;
      if (response2.ok && response2.status == 200) {
        jsonifiedResponse = await response2.json();
      } else {
        jsonifiedResponse = false;
      }
      return jsonifiedResponse;
    } catch {
      return false;
    }
  }
}