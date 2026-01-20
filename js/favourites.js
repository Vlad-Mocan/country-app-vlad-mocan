import { searchResult } from "./dom.js";
import { saveArrayToLocalStorage } from "./storage.js";

export const isFavourite = (country) => {
  if (localStorage.getItem("favourite-countries")) {
    const favouriteCountries = localStorage.getItem("favourite-countries");
    const favouriteCountriesParsed = JSON.parse(favouriteCountries);
    if (favouriteCountriesParsed.includes(country?.cca3.toLowerCase())) {
      return true;
    }
  }
  return false;
};

searchResult.addEventListener("click", (e) => {
  const favouriteButton = e.target.closest(".fav-btn");

  if (favouriteButton) {
    const countryCode = favouriteButton.dataset?.name.toLowerCase();
    console.log(countryCode);
    saveArrayToLocalStorage("favourite-countries", countryCode);
    if (favouriteButton?.innerText === "☆") {
      favouriteButton.innerText = "⭐️";
    } else {
      favouriteButton.innerText = "☆";
    }
  }
});
