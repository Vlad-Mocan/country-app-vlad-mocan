import { getInformationAboutCountry } from "./api.js";
import {
  searchResult,
  favouriteCountriesGrid,
  historyList,
  numberOfHistoryEntries,
  closeButton,
  overlay,
  sidePanel,
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
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
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
  numberOfHistoryEntries.textContent = ``;

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

export const displayCountryInformation = (country) => {
  const rect = country.getBoundingClientRect();
  const clone = country.cloneNode(true);
  country.classList.add("invisible");

  clone.classList.add("flying-card");

  clone.style.width = rect.width + "px";
  clone.style.height = rect.height + "px";
  clone.style.top = rect.top + "px";
  clone.style.right = rect.right + "px";
  clone.style.bottom = rect.bottom + "px";
  clone.style.left = rect.left + "px";
  console.log(rect);

  document.body.appendChild(clone);

  overlay.classList.remove("hidden");

  getInformationAboutCountry(country.textContent.trim().toLowerCase());

  requestAnimationFrame(() => {
    clone.classList.add("active-flying-card");
  });
};

export const closeCountryInformation = () => {
  const clone = document.querySelector(".flying-card");
  const originalCard = document.querySelector(".invisible");

  if (clone) {
    clone.classList.remove("active-flying-card");
    overlay.classList.add("hidden");
    sidePanel.classList.remove("open");
    clone.addEventListener(
      "transitionend",
      () => {
        clone.remove();
        // overlay.classList.add("hidden");
        if (originalCard) {
          originalCard.classList.remove("invisible");
        }
      },
      { once: true }
    );
  }
};

export const createCountryDescriptionHTML = (countryInformation) => {
  const html = `<h1>${countryInformation.title}</h1>
  <p>${countryInformation.description}</p>
  ${countryInformation.extract_html}`;
  sidePanel.innerHTML += html;
  console.log(sidePanel.innerHTML);
};
