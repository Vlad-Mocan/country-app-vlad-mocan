input = document.querySelector("#country-search");
searchButton = document.querySelector("#btn-search");
searchResult = document.querySelector(".search-result");
searchForm = document.querySelector("#search-form");
allCountriesButton = document.querySelector(".all-countries-btn");
loadingButton = document.querySelector(".loading-btn");

async function getAllCountries() {
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

    countries = await response.json();
    loadingButton.classList.add("hidden");

    await displayCountries(countries);
  } catch (error) {
    console.error(error);
  } finally {
    loading = false;
    allCountriesButton.disabled = false;
  }
}

async function getCountriesByName(countryName) {
  let loading = true;
  loadingButton.classList.remove("hidden");
  searchButton.disabled = true;

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

const displayCountries = async (countries) => {
  searchResult.innerHTML = `
  <h3 class = "result-number">Number of results: ${countries.length}</h3>`;

  await createHTML(countries);
};

const createHTML = async (countries) => {
  let count = 20;

  for (const country of countries) {
    const favourited = isFavourite(country);

    console.log(favourited);
    searchResult.innerHTML += `
        <li class = "country-box">
          <button type="button" class="fav-btn" data-name="${
            country.name.common
          }">
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

const isFavourite = (countryName) => {
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
