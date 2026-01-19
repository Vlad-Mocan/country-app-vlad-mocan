import { displayCountries } from "./ui.js";
import {
  allCountriesButton,
  searchResult,
  loadingButton,
  searchButton,
} from "./dom.js";

import { saveArrayToLocalStorage } from "./storage.js";

export async function getAllCountries() {
  let loading = true;
  loadingButton.classList.remove("hidden");
  allCountriesButton.disabled = true;

  const url =
    "https://restcountries.com/v3.1/all?fields=name,capital,population,currencies,flags";

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
  } finally {
    loading = false;
    searchButton.disabled = false;
  }
}
