export const WeatherInfo = ({ temperature, weatherIcon, weather, windSpeed, children }) => {
  return (
    <div className="weather-info">
      <div className="weather-info-title">{children}</div>
      <div className="weather-info-data">
        {temperature && (
          <p className="weather-info-main">{temperature}℃</p>
        )}
        {weather && (
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
        )}
        {windSpeed && (
          <p className="weather-info-main">{windSpeed}m/s</p>
        )}
      </div>
    </div>
  );
};
