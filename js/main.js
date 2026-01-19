import { getAllCountries, getCountriesByName } from "./api.js";
import {
  input,
  searchResult,
  searchForm,
  allCountriesButton,
  navElements,
} from "./dom.js";

navElements.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    navElements.forEach((nav) => nav.classList.remove("active"));
    element.classList.add("active");
  });
});

allCountriesButton.addEventListener("click", (e) => {
  e.preventDefault();
  searchResult.innerHTML = "";
  getAllCountries();
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchResult.innerHTML = "";
  searchedCountry = input.value.toLowerCase();
  getCountriesByName(searchedCountry);
});
