export const WeatherInfo = ({ title, children }) => {
  return (
    <div className="weather-info">
      <div className="weather-info-title">{title}</div>
      <div className="weather-info-data">
        {children}
      </div>
    </div>
  );
};
