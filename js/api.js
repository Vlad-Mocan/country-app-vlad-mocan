import {
  createCountryDescriptionHTML,
  displayCountries,
  displayFavouriteCountries,
} from "./ui.js";
import {
  allCountriesButton,
  searchResult,
  loadingButton,
  searchButton,
  favouritesLoading,
  sidePanel,
  sidePanelLoading,
} from "./dom.js";

import { saveArrayToLocalStorage } from "./storage.js";

export async function getAllCountries() {
  let loading = true;
  loadingButton.classList.remove("hidden");
  allCountriesButton.disabled = true;

  const url =
    "https://restcountries.com/v3.1/all?fields=name,capital,population,currencies,flags,cca3";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response error with status: ${response.status}`);
    }

    const countries = await response.json();
    loadingButton.classList.add("hidden");

    await displayCountries(countries);
  } catch (error) {
    console.error(error);
    loadingButton.classList.add("hidden");
  } finally {
    loading = false;
    allCountriesButton.disabled = false;
  }
}

export async function getCountriesByName(countryName) {
  let loading = true;
  loadingButton.classList.remove("hidden");
  searchButton.disabled = true;

  saveArrayToLocalStorage("history", countryName);

  const url = `https://restcountries.com/v3.1/name/${countryName}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        searchResult.innerHTML = `<h3 class = "error-message">Could not find the country. Please try again!</h3>`;
        throw new Error(`Could not find country: ${response.status}`);
      } else {
        throw new Error(`Server error, please try again later!`);
      }
    }

    const countries = await response.json();
    loadingButton.classList.add("hidden");

    await displayCountries(countries);
  } catch (error) {
    console.error(error);
    loadingButton.classList.add("hidden");
  } finally {
    loading = false;
    searchButton.disabled = false;
  }
}

export async function getCountriesByCode(countriesCode) {
  let loading = true;
  favouritesLoading.classList.remove("hidden");
  const url = `https://restcountries.com/v3.1/alpha?codes=${countriesCode}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not find countries: ${response.status}`);
    }

    const countries = await response.json();
    displayFavouriteCountries(countries);
    console.log(countries);
  } catch (error) {
    console.error(error);
  } finally {
    loading = false;
    favouritesLoading.classList.add("hidden");
  }
}

export async function getInformationAboutCountry(country) {
  console.log(country, typeof country);
  let loading = true;
  sidePanelLoading.classList.remove("hidden");

  sidePanel.innerHTML = ``;
  sidePanel.classList.add("open");

  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${country}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Could not fetch information about country: ${response.status}`
      );
    }
    const information = await response.json();
    createCountryDescriptionHTML(information);
    console.log(information);
  } catch (error) {
    console.error(error);
  } finally {
    sidePanelLoading.classList.add("hidden");
  }
}
