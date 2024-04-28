import { WeatherInfo } from "./WeatherInfo";

export const Result = ({weatherInfos}) => {
  const {location} = weatherInfos;
  return(
    <div>
      <h2>{location}の天気</h2>
      <WeatherInfo type="temperature" weatherInfos={weatherInfos}>気温</WeatherInfo>
      <WeatherInfo type="weather" weatherInfos={weatherInfos}>天気</WeatherInfo>
      <WeatherInfo type="windSpeed" weatherInfos={weatherInfos}>風速</WeatherInfo>
    </div>
  );
};