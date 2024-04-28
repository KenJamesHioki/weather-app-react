import { Suggestion } from "./Suggestion";

export const Suggestions = () => {
  return(
    <div>
      <p>候補が複数見つかりました：</p>
      <Suggestion>都市名1</Suggestion>
      <Suggestion>都市名2</Suggestion>
    </div>
  );
};
