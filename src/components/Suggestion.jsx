export const Suggestion = ({onClick, children}) => {
  return(
    <div>
      <p onClick={onClick}>{children}</p>
    </div>
  );
};