import { useState } from 'react';
import './App.css';
import { ErrorMessage } from './components/ErrorMessage';
import { Result } from './components/Result';
import { Suggestions } from './components/Suggestions';
const APIKEY = '16806dd9a591b25a5beebeb69dd718b8';

const WeatherApp = () => {
  const [input, setInput] = useState('');
  const [state, setState] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [weatherInfos, setWeatherInfos] = useState({});

  const trigger = async (location) => {
    // this.loader.display();

    try {
      const locationDetails = await fetchLocationDetails(location);
      const uniqueLocationInfos = removeDuplicateLocations(locationDetails.map(location => extractLocationInfo(location)));

      if (!uniqueLocationInfos.length) {
        setState('isError');
        // throw new NoCityError('都市が見つかりませんでした。');
      }

      if (uniqueLocationInfos.length === 1) {
        setState('isSuccess');
        const coordinates = {
          lat: uniqueLocationInfos[0].lat,
          lon: uniqueLocationInfos[0].lon,
        }

        renderWeather(coordinates);

      } else {
        setState('hasSuggestions');
        setSuggestions(uniqueLocationInfos);
      }

    } catch (e) {
      // resetHtml();
      // errorHandler.trigger(e);

    } finally {
      // this.loader.hide();
    }
  }

  const fetchLocationDetails = async (location) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=10&appid=${APIKEY}`);
    if (!response.ok) {
      setState("isError");
      // throwNewError(response.status);
    }

    return await response.json();
  }

  const removeDuplicateLocations = (allLocations) => {
    const uniqueLocations = Array.from(new Map(allLocations.map(location => [location.name, location])));

    return uniqueLocations.map(location => location[1]);
  }

  const extractLocationInfo = (location) => {
    const locationInfo = {
      name: location.name,
      lat: location.lat,
      lon: location.lon,
    }
    if (location.local_names && location.local_names.ja) {
      locationInfo.name = location.local_names.ja;
    }

    return locationInfo;
  }

  const renderWeather = async (coordinates) => {
    // this.loader.display();

    try {
      const weatherDetails = await fetchWeatherDetails(coordinates);
      renderWeatherInfos(weatherDetails);

    } catch (e) {
      // this.#resetHtml();
      // this.errorHandler.trigger(e);

    } finally {
      // this.loader.hide();
    }
  }

  const fetchWeatherDetails = async (coordinates) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${APIKEY}&units=metric&lang=ja`);
    if (!response.ok) {
      // this.#throwNewError(response.status)
    }

    return await response.json();
  }

  const renderWeatherInfos = (weatherDetails) => {
    setWeatherInfos({
      location: weatherDetails.name,
      temperature: weatherDetails.main.temp,
      weather: weatherDetails.weather[0].description,
      weatherIcon: weatherDetails.weather[0].icon,
      windSpeed: weatherDetails.wind.speed,
    });
    setState('isSuccess');
  }

  const onClickSuggestion = (suggestionInfo) => {
    const selectedSuggestion = suggestions.filter(suggestion => suggestionInfo.lat === suggestion.lat && suggestionInfo.lon === suggestion.lon)[0];
    renderWeather({
      lat: selectedSuggestion.lat,
      lon: selectedSuggestion.lon,
    });
  }

  const onFormSubmit = () => {
    console.log(`form submit: ${input}`);
    trigger(input);
  }

  //TODO:エラーメッセージをそれぞれこの形に形成する
  const errorMessage = "エラーが発生しました"

  return (
    <div>
      <h1>天気を調べよう</h1>
      <p>天気を調べたい都市名を入力してください</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        setInput("");
        onFormSubmit();
      }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button>検索</button>
      </form>
      {state === 'hasSuggestions' && <Suggestions suggestions={suggestions} onClick={onClickSuggestion} />}
      {state === 'isSuccess' && <Result weatherInfos={weatherInfos} />}
      {state === 'isError' && <ErrorMessage errorMessage={errorMessage}>エラーが発生しました</ErrorMessage>}
    </div>
  );
}

export default WeatherApp;
