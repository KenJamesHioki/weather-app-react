export const ErrorMessage = ({errorMessage}) => {
  return(
    <div className="weather__error-message">
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};