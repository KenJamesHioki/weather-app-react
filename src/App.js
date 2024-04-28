import { useState } from 'react';
import './App.css';
import { ErrorMessage } from './components/ErrorMessage';
import { Result } from './components/Result';
import { Suggestions } from './components/Suggestions';

function WeatherApp() {
  const [input, setInput] = useState("");

  //TODO:Geocoding APIからもらったデータをこの形に形成する
  const suggestions = [{
    name: "都市名1",
    lat: 33.44,
    lon: -92.12,
  }, {
    name: "都市名2",
    lat: 33.66,
    lon: -92.67,
  }];
  
  const onClickSuggestion = (suggestionInfo) => {
    const selectedSuggestion = suggestions.filter(suggestion => suggestionInfo.lat === suggestion.lat && suggestionInfo.lon === suggestion.lon)[0];
    console.log(selectedSuggestion);
  }

  const onFormSubmit = () => {
    console.log(`form submit: ${input}`);
    //ここでinputのデータを埋め込んだAPIをコールして、緯度、経度の情報を取得する。
    //都市名がヒットしない場合：NoCityのエラーを投げる (isError)
    //都市が1つの場合：天気情報をレンダーする (hasSuggestions)
    //都市が複数の場合：候補をレンダーする (isSuccess)
    //コール中にエラーが発生した場合：エラーを適宜投げる (isError)
  }

  //TODO:OpenWeather APIからもらったデータをこの形に形成する
  const weatherInfos = {
    location: "都市名4",
    temperature: 27.9,
    weather: "晴れ",
    weatherIcon: "01d",
    windSpeed: 7.72,
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
      <Suggestions suggestions={suggestions} onClick={onClickSuggestion} />
      <Result weatherInfos={weatherInfos} />
      <ErrorMessage errorMessage={errorMessage}>エラーが発生しました</ErrorMessage>
    </div>
  );
}

export default WeatherApp;
