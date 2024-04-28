import { Suggestion } from "./Suggestion";

export const Suggestions = ({ suggestions, onClick }) => {
  return (
    <div>
      <p>候補が複数見つかりました：</p>
      {suggestions.length !== 0 && suggestions.map((suggestion, index) => (
        <Suggestion key={index} onClick={()=>onClick({lat:suggestion.lat, lon:suggestion.lon})}>{suggestion.name}</Suggestion>
      ))}
    </div>
  );
};
