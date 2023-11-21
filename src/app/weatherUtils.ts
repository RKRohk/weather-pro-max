import { redisClient } from "./cache";

export const getWeather = async ({ zipCode, countryCode }: { zipCode: string, countryCode: string }) => {

    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${zipCode + ' ' + countryCode}&timesteps=1h&timesteps=1d&apikey=${process.env.WEATHER_API_TOKEN}`;
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    const client = await redisClient();
    const data = await client.getEx(`${zipCode + ' ' + countryCode}`, { EX: 1800 });

    if (data) {
        console.log('Cache hit')
        const { currentTemperature, maxTemperature, minTemperature, location } = JSON.parse(data)
        return { currentTemperature, maxTemperature, minTemperature, location, cacheHit: true }
    }

    const weather = await fetch(url, options)

    const weatherData = await weather.json()

    console.log(weatherData.timelines.hourly[0].values)

    const currentTemperature = weatherData.timelines.hourly[0].values.temperature

    const maxTemperature = weatherData.timelines.daily[0].values.temperatureMax

    const minTemperature = weatherData.timelines.daily[0].values.temperatureMin

    const location = weatherData.location.name

    await client.setEx(`${zipCode + ' ' + countryCode}`, 1800, JSON.stringify({ currentTemperature, maxTemperature, minTemperature, location }))

    return { currentTemperature, maxTemperature, minTemperature, location, cacheHit: false }
}