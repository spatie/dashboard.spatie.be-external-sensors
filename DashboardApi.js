require('dotenv').config();
const request = require('request');

module.exports = class DashboardApi {
    reportTemperature(temperature)
    {
        this.post('/temperature', { temperature });
    }

    reportAirQuality(iaq)
    {
        this.post('/indoor-air-quality', { indoorAirQuality: iaq });
    }

    post(endpointUrl, data) {
        const username = process.env.DASHBOARD_USERNAME;
        const password = process.env.DASHBOARD_PASSWORD;
        const url = process.env.DASHBOARD_URL + endpointUrl + '?access-token=' + process.env.DASHBOARD_ACCESS_TOKEN;

        request.post({
                url,
                json: data,
            },
            error => {
                if (error) {
                    console.error(error);
                }
            }
        );
    }
}
