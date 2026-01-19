import { searchResult } from "./dom.js";

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
    const countryName = favouriteButton.dataset?.name;
    if (localStorage.getItem("favourite-countries")) {
      const favouriteCountries = localStorage.getItem("favourite-countries");
      const favouriteCountriesParsed = JSON.parse(favouriteCountries);
      if (favouriteCountriesParsed.includes(countryName)) {
        const result = favouriteCountriesParsed.filter(
          (country) => country !== countryName
        );
        localStorage.setItem("favourite-countries", JSON.stringify(result));
      } else {
        favouriteCountriesParsed.push(countryName);
        localStorage.setItem(
          "favourite-countries",
          JSON.stringify(favouriteCountriesParsed)
        );
      }
    } else {
      const newFavouriteCountry = [countryName];
      localStorage.setItem(
        "favourite-countries",
        JSON.stringify(newFavouriteCountry)
      );
    }

    if (favouriteButton?.innerText === "☆") {
      favouriteButton.innerText = "⭐️";
    } else {
      favouriteButton.innerText = "☆";
    }
  }
});
