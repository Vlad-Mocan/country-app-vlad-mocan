import {
  getAllCountries,
  getCountriesByName,
  getCountriesByCode,
} from "./api.js";

import {
  input,
  searchResult,
  searchForm,
  allCountriesButton,
  navElements,
  sections,
  favouriteSectionNav,
  favouriteCountriesParagraph,
  favouriteCountriesGrid,
  historySectionNav,
  historyList,
  closeButton,
  overlay,
  themeButton,
} from "./dom.js";

import {
  closeCountryInformation,
  displayCountryInformation,
  displayHistory,
} from "./ui.js";

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

favouriteSectionNav.addEventListener("click", (e) => {
  e.preventDefault();
  if (localStorage.getItem("favourite-countries")) {
    const favouriteCountries = JSON.parse(
      localStorage.getItem("favourite-countries")
    );
    if (favouriteCountries.length > 0) {
      console.log(favouriteCountries);
      const cleanString = favouriteCountries.join(",");
      getCountriesByCode(cleanString);
    } else {
      favouriteCountriesParagraph.textContent = "NO FAVOURITE COUNTRIES SAVED";
    }
  } else {
    favouriteCountriesParagraph.textContent = "NO FAVOURITE COUNTRIES SAVED";
  }
});

favouriteCountriesGrid.addEventListener("click", (e) => {
  e.preventDefault();
  const country = e.target.closest(".grid-country");
  if (country) {
    e.stopPropagation();
    displayCountryInformation(country);
  }
});

closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeCountryInformation();
});

historySectionNav.addEventListener("click", (e) => {
  e.preventDefault();

  if (localStorage.getItem("history")) {
    const history = JSON.parse(localStorage.getItem("history"));
    displayHistory(history);
  } else {
    historyList.innerHTML = `<h2>YOUR HISTORY IS EMPTY</h2>`;
  }
});

themeButton.addEventListener("click", (e) => {
  e.preventDefault();

  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeButton.innerHTML = "☀️";
  } else {
    themeButton.innerHTML = "🌙";
  }
});
