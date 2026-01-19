import { searchResult } from "./dom.js";
import { saveArrayToLocalStorage } from "./storage.js";

export const isFavourite = (countryName) => {
  if (localStorage.getItem("favourite-countries")) {
    const favouriteCountries = localStorage.getItem("favourite-countries");
    const favouriteCountriesParsed = JSON.parse(favouriteCountries);
    if (favouriteCountriesParsed.includes(countryName)) {
      return true;
    }
    return false;
  }
};

searchResult.addEventListener("click", (e) => {
  const favouriteButton = e.target.closest(".fav-btn");

  if (favouriteButton) {
    const countryName = favouriteButton.dataset?.name.toLowerCase();
    saveArrayToLocalStorage("favourite-countries", countryName);
    if (favouriteButton?.innerText === "☆") {
      favouriteButton.innerText = "⭐️";
    } else {
      favouriteButton.innerText = "☆";
    }
  }
});
