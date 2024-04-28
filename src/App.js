import './App.css';
import { ErrorMessage } from './components/ErrorMessage';
import { Result } from './components/Result';
import { Suggestions } from './components/Suggestions';

function WeatherApp() {
  return (
    <div>
      <h1>天気を調べよう</h1>
      <p>天気を調べたい都市名を入力してください</p>
      <form>
        <input/>
        <button>検索</button>
      </form>
      <Suggestions/>
      <Result>都市名3</Result>
      <ErrorMessage>エラーが発生しました</ErrorMessage>
    </div>
  );
}

export default WeatherApp;
