export const WeatherInfo = ({ type, weatherInfos, children }) => {
  return (
    <div className="weather-info">
      <div className="weather-info-title">{children}</div>
      <div className="weather-info-data">
        {type === "temperature" && (
          <p className="weather-info-main">{weatherInfos.temperature}℃</p>
        )}
        {type === "weather" && (
          <>
            <div className="weather-info-icon-container">
              <img
                className="weather-info-icon"
                src={`https://openweathermap.org/img/wn/${weatherInfos.weatherIcon}@2x.png`}
                alt="Weather Icon"
              />
            </div>
            <p className="weather-info-sub">{weatherInfos.weather}</p>
          </>
        )}
        {type === "windSpeed" && (
          <p className="weather-info-main">{weatherInfos.windSpeed}m/s</p>
        )}
      </div>
    </div>
  );
};
