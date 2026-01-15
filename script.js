input = document.querySelector("#country-search");
button = document.querySelector("#btn-search");
searchResult = document.querySelector(".search-result");
searchForm = document.querySelector("#search-form");

// let countries = [];
// async function getAllCountriesByName() {
//   const url =
//     "https://restcountries.com/v3.1/all?fields=name,capital,population";

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response error with status: ${response.status}`);
//     }

//     countries = await response.json();
//     console.log(countries);
//   } catch (error) {
//     console.error(error);
//   }
// }
// document.addEventListener("DOMContentLoaded", () => {
//   getAllCountriesByName();
// });

async function getCountryByName(countryName) {
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
    const country = await response.json();
    displayCountry(country);
  } catch (error) {
    console.error(error);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  searchedCountry = input.value.toLowerCase();
  getCountryByName(searchedCountry);
});

const displayCountry = (countries) => {
  searchResult.innerHTML = `
  <h3 class = "result-number">Number of results: ${countries.length}</h3>
  <ul class = "country-list"></ul>`;
  console.log(countries);
  countries.forEach(
    (country) =>
      (searchResult.innerHTML += `
        <li class = "country-box">
          <img src = "${country.flags.png}" alt = ${country.flags.alt}>
          <div class = "country-details">
            <p>Name: ${country.name.common}<p/>
            <p>Capital: ${country.capital}</p>
            <p>Main Currency: ${Object.values(country.currencies)[0].name}</p>
            <p>Population: ${country.population}</p>
          </div>
        </li>`)
  );
};
