import { getAllCountries, getCountriesByName } from "./api.js";
import {
  input,
  searchResult,
  searchForm,
  allCountriesButton,
  navElements,
  sections,
} from "./dom.js";

navElements.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();

    navElements.forEach((nav) => nav.classList.remove("active"));
    sections.forEach((section) => section.classList.remove("active"));

    const sectionId = element.getAttribute("href").substring(1);
    const section = document.querySelector(`#${sectionId}`);

    element.classList.add("active");
    section.classList.add("active");
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
  const searchedCountry = input.value.toLowerCase();
  getCountriesByName(searchedCountry);
});
