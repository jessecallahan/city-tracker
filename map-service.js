export class MapService {
    async getMapByCity(city) {
        try {
            let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/xml?address=${city}&key=AIzaSyDlQPlXZJPBhkNXMnpnAIp96Ih_7s9CLwQ&q`);
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


