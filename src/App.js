import './App.css';
import { useState } from 'react';
import { ErrorMessage } from './components/ErrorMessage';
import { Result } from './components/Result';
import { Suggestions } from './components/Suggestions';
import { Loader } from './components/Loader';
const APIKEY = '16806dd9a591b25a5beebeb69dd718b8';

const WeatherApp = () => {
  const [input, setInput] = useState('');
  const [state, setState] = useState(null); //state: isLoading, hasSuggestions, isSuccess, isError
  const [suggestions, setSuggestions] = useState([]);
  const [weatherInfos, setWeatherInfos] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const trigger = async (location) => {
    setState('isLoading');

    try {
      const locationDetails = await fetchLocationDetails(location);
      const uniqueLocationInfos = removeDuplicateLocations(locationDetails.map(location => extractLocationInfo(location)));

      if (!uniqueLocationInfos.length) {
        setErrorMessage('お探しの都市の天気情報が見つかりませんでした。別の都市名を入力し、再度お試しください。');
        throw new Error('都市が見つかりませんでした。');
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
      console.error(e);
      setState('isError');
    }
  }

  const fetchLocationDetails = async (location) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=10&appid=${APIKEY}`);
    if (!response.ok) {
      setState("isError");
      handleStatus(response.status);
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
    setState('isLoading');

    try {
      const weatherDetails = await fetchWeatherDetails(coordinates);
      renderWeatherInfos(weatherDetails);

    } catch (e) {
      console.error(e);
      setErrorMessage('予期せぬエラーが発生しました。');
    }
  }

  const fetchWeatherDetails = async (coordinates) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${APIKEY}&units=metric&lang=ja`);
    if (!response.ok) {
      handleStatus(response.status)
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
    trigger(input);
  }

  const handleStatus = (status) => {
    switch (status) {
      case 400:
      case 401:
      case 404:
      case 429:
        setErrorMessage(`天気情報が取得できませんでした。`);
        throw new Error(`エラーコード：${status}`);

      case 500:
      case 502:
      case 503:
      case 504:
        setErrorMessage(`天気情報が取得できませんでした。<br>時間をおいてから再度お試しください。`);
        throw new Error(`エラーコード：${status}`);
        
      default:
        setErrorMessage('予期せぬエラーが発生しました。')
        throw new Error(`エラーコード：${status}`);
    }
  }

  return (
    <div className='app__wrapper'>
      <div id="container">
        {state === 'isLoading' && <Loader/>}
        <main id="main">
          <section className="weather">
            <div className="weather__inner">
              <h1 className="weather__title">天気を調べよう</h1>
              <p className="weather__description">天気を調べたい都市名を入力してください</p>
              <form className="weather__search-form" onSubmit={(e) => {
                e.preventDefault();
                setInput("");
                onFormSubmit();
              }}>
                <input className="weather__textbox" value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="submit" className="btn weather__search-btn">検索</button>
              </form>
              {state === 'hasSuggestions' && <Suggestions suggestions={suggestions} onClick={onClickSuggestion} />}
              {state === 'isSuccess' && <Result weatherInfos={weatherInfos} />}
              {state === 'isError' && <ErrorMessage errorMessage={errorMessage}/>}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default WeatherApp;
