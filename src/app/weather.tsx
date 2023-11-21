import { getWeather } from "./weatherUtils"

export default async function Weather({zipCode, countryCode} : {zipCode: string, countryCode: string}) {
    const { currentTemperature, minTemperature, maxTemperature, location,  cacheHit } = await getWeather({zipCode, countryCode});
    return <>
    <p>Weather for {location} </p>
    <p> Current Temperature : { currentTemperature } degrees Celcius </p>
    <p> Min Temperature : { minTemperature } degrees Celcius</p>
    <p> Max Temperature : { maxTemperature } degrees Celcius</p>
    <p>Cache-Hit = {cacheHit ? "true" : "false"}</p>
    </>
}