export const WeatherInfo = ({ type, weatherInfos, children }) => {
  return (
      <div>
        <div>{children}</div>
        {type === "temperature" && (
          <div>
            <p>{weatherInfos.temperature}℃</p>
          </div>
        )}
        {type === "weather" && (
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${weatherInfos.weatherIcon}@2x.png`}
              alt="Weather Icon"
            ></img>
            <p>{weatherInfos.temperature}℃</p>
          </div>
        )}
        {type === "windSpeed" && (
          <div>
            <p>{weatherInfos.windSpeed}m/s</p>
          </div>
        )}
      </div>
  );
};
