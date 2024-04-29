export const Suggestion = ({onClick, children}) => {
  return(
      <li className="location-suggestions__li" onClick={onClick}>{children}</li>
  );
};