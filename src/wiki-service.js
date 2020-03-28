export class WikiService {
  async getWikiByCity(city) {
    try {
      let response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${city}`);
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