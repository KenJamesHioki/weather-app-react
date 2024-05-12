import { WeatherInfo } from "./WeatherInfo";

export const Result = ({ weatherInfos }) => {
  const { location, temperature, weatherIcon, weather, windSpeed } =
    weatherInfos;

  return (
    <div className="location-suggestions">
      <h2 className="weather__result-location">{location}の天気</h2>
      <div className="weather__result">
        <WeatherInfo temperature={weatherInfos.temperature} title="気温">
          <p className="weather-info-main">{temperature}℃</p>
        </WeatherInfo>
        <WeatherInfo
          weatherIcon={weatherInfos.weatherIcon}
          weather={weatherInfos.weather}
          title="天気"
        >
          <>
            <div className="weather-info-icon-container">
              <img
                className="weather-info-icon"
                src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                alt="Weather Icon"
              />
            </div>
            <p className="weather-info-sub">{weather}</p>
          </>
        </WeatherInfo>
        <WeatherInfo windSpeed={weatherInfos.windSpeed} title="風速">
          <p className="weather-info-main">{windSpeed}m/s</p>
        </WeatherInfo>
      </div>
    </div>
  );
};
