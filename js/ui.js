import {
  searchResult,
  favouriteCountriesGrid,
  historyList,
  numberOfHistoryEntries,
} from "./dom.js";
import { isFavourite } from "./favourites.js";

export const displayCountries = async (countries) => {
  searchResult.innerHTML = `
  <p class = "result-number"><strong>NUMBER OF RESULTS: ${countries.length}</strong></p>`;

  let count = 20;

  for (const country of countries) {
    const favourited = isFavourite(country);

    searchResult.innerHTML += `
        <li class = "country-box">
          <button type="button" class="fav-btn" data-name="${country?.cca3}">
            ${favourited ? "⭐️" : "☆"}
          </button>
          <img src = "${country.flags.png}" alt = ${country.flags.alt}>
          <div class = "country-details">
            <p class = "country-name"><strong>Name:</strong> ${
              country.name.common
            }<p/>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Main Currency:</strong> ${
              Object?.values(country?.currencies)[0]?.name ||
              "No currency found"
            }</p>
            <p><strong>Population:</strong> ${country.population}</p>
          </div>
        </li>`;

    count++;

    if (count % 20 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
};

export const displayFavouriteCountries = (countries) => {
  favouriteCountriesGrid.innerHTML = ``;
  countries.forEach((country) => {
    favouriteCountriesGrid.innerHTML += `<li class = "grid-country">
    <img class = "grid-country__img"  src="${country.flags.png}" alt = "${country.flags.alt}" />
    <p>${country.name.common}</p>
    </li>`;
  });
};

export const displayHistory = (history) => {
  historyList.innerHTML = ``;
  if (history.length == 0) {
    numberOfHistoryEntries.textContent = `YOUR HISTORY IS EMPTY`;
    return;
  } else {
    numberOfHistoryEntries.textContent = `${
      history.length === 1 ? `1 ENTRY:` : `${history.length} ENTRIES:`
    }`;
  }

  console.log(history);

  history.forEach((entry) => {
    historyList.innerHTML += `
    <li class = "history-item">${entry}</li>`;
  });
};
