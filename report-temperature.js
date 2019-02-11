const raspi = require('raspi');
const OneWire = require('raspi-onewire').OneWire;
const dashboardApi = require('./DashboardApi');

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

    dashboardApi.reportTemperature(temperature);
}
