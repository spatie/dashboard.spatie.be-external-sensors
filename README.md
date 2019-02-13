**WIP: This repo is a wip - indoor air quality data is not working yet**

# External sensors for dashboard.spatie.be

Small Node.js script to report **office temperatures** and **indoor air quality** to the [Spatie dashboard](https://github.com/spatie/dashboard.spatie.be). Uses the 1-wire bus and IC2 on a Raspberry Pi to read data from external sensors. 

- office temperature: DS18B20 sensor over 1-wire bus
- indoor air quality (IAQ): BME680 over IC2

## Install

You can install the reporter on your Raspberry Pi by cloning the repository and installing its dependencies.

```bash
git clone git@github.com:spatie/raspberrypi-temperature-reporter.git
yarn install
```

Copy or rename the `.env.example` file to `.env` and update the values in there with your dashboard's URL, basic auth username and password.

```bash
cp .env.example .env
```

Run the script to make sure a temperature is being reported and broadcasted:

```bash
node report-temperature.js
# expected output: temperature=21.312
```

Finally add the script to your Raspberry's cronjobs using `crontab -e` to run once per minute.

```
* * * * * sudo /bin/bash -c "cd /home/pi/raspberrypi-temperature-reporter/ && node ./report-temperature.js" >> /home/pi/temperature.log 2>&1
```

## Deploying code changes to the Raspberry Pi

If you're running a fork of this script you can use the `Envoy.blade.php` file to deploy changes to your pi after pushing.
The deploy script will SSH to your pi and pull in new changes from the git repository.

```bash
envoy run deploy
```

## Contributing

Since this is an internal project, we don't accept pull requests at this time. If you have discovered a bug or have an idea to improve the code, open an issue first before you start coding.

### Security

If you discover any security related issues, please contact freek@spatie.be instead of using the issue tracker.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

### Support us

Does your business depend on our contributions? Reach out and support us on [Patreon](https://www.patreon.com/spatie).
All pledges will be dedicated to allocating workforce on maintenance and new awesome stuff.

### Postcardware

You're free to use this package, but if it makes it to your production environment we highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Samberstraat 69D, 2060 Antwerp, Belgium.

We publish all received postcards [on our company website](https://spatie.be/en/opensource/postcards).

## Credits

- [Alex Vanderbist](https://github.com/AlexVanderbist)
- [All Contributors](../../contributors)

### About Spatie

Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).
