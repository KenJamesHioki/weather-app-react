import { WeatherInfo } from "./WeatherInfo";

export const Result = ({ weatherInfos }) => {
  const { location } = weatherInfos;
  return (
    <div className="location-suggestions">
      <h2 className="weather__result-location">{location}の天気</h2>
      <div className="weather__result">
        <WeatherInfo temperature={weatherInfos.temperature}>
          気温
        </WeatherInfo>
        <WeatherInfo weatherIcon={weatherInfos.weatherIcon} weather={weatherInfos.weather}>
          天気
        </WeatherInfo>
        <WeatherInfo windSpeed={weatherInfos.windSpeed}>
          風速
        </WeatherInfo>
      </div>
    </div>
  );
};
