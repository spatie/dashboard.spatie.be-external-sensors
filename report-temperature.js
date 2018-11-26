// const raspi = require('raspi');
// const OneWire = require('raspi-onewire').OneWire;
const request = require('request');
require('dotenv').config();

raspi.init(() => {
    const bus = new OneWire();
    bus.searchForDevices((err, devices) => {
        bus.readAllAvailable(devices[0], (err, data) => {
            parseData(data.toString());
        });
    });
});

function parseData(data)
{
    let temperature = Number(data.match(/t=(\d+)/)[1]);

    if (temperature === 0) {
        new Error(`Invalid sensor data: ${data}`);
    }

    temperature = temperature / 1000;

    console.log(`temperature=${temperature}`);

    reportTemperature(temperature);
}

function reportTemperature(temperature)
{
    const username = process.env.DASHBOARD_USERNAME;
    const password = process.env.DASHBOARD_PASSWORD;
    const url = process.env.DASHBOARD_URL + '/temperature?access-token=' + process.env.DASHBOARD_ACCESS_TOKEN;

    request.post({
            url,
            json: { temperature },
        },
        error => {
            if (error) {
                console.error(error);
            }
        }
    );
}
