import { WeatherInfo } from "./WeatherInfo";

export const Result = ({children}) => {
  return(
    <div>
      <h2>{children}の天気</h2>
      <WeatherInfo></WeatherInfo>
      <WeatherInfo></WeatherInfo>
      <WeatherInfo></WeatherInfo>
    </div>
  );
};