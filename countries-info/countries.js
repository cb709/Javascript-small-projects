let headingText = document.getElementById("heading").innerText;
console.log(headingText);

function loadData() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((json) => displayData(json));
}

function displayData(data) {
  document.getElementById("heading").innerText = "All Countries Here";
  const countriesDiv = document.getElementById("countries-container");
  countriesDiv.innerHTML = ` `;
  for (const country of data) {
    const countryDiv = document.createElement("div");
    countriesDiv.innerHTML += `
          <div class="country-card">
          <div class="flag">
            <img src="${country.flags.svg}" alt="" />
          </div>
          <div class="info">
            <h2 class="country-name">${country.name.common.slice(0, 20)}</h2>
            <h5 class="capital">Capital: ${country.capital}</h5>
            <button class='explore-btn btn btn-outline-success' onclick="showData('${
              country.cca2
            }')">Explore</button>
          </div>
        </div>
        `;
  }
}

function showData(code) {
  const url = `https://restcountries.com/v2/alpha/${code}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showCountryDetails(data));
}

function showCountryDetails(country) {
  console.log(country);
  const countryDetalisDiv = document.getElementById("country-detail-container");
  countryDetalisDiv.innerHTML = `
      <button id="close-btn" onclick="closeWindow()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg></button>
      <h2 class="name"> ${country.name} </h2>
      <p class="region">Region: ${country.region}</p>
      <p class="currency">Currency: ${country.currencies[0].symbol} ${country.currencies[0].name}</p>
      <p class="language">Language: ${country.languages[0].name}</p>
      <p class="population">Population: ${country.population}</p>
  `;
  countryDetalisDiv.style.display = "block";
}

function closeWindow() {
  document.getElementById("country-detail-container").style.display = "none";
}

// ---------------search------------------
function showSearchResult() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((json) => displaySearchData(json));
}

function displaySearchData(data) {
  const allCountries = data;
  const result = [];
  const searchText = document.getElementById("search").value.toLowerCase();
  console.log(searchText);
  // console.log(allCountries);
  if (searchText == "") {
    alert("Insert Search Text");
  } else {
    allCountries.forEach((element) => {
      let value = element.name.common;
      if (value.toLowerCase().includes(searchText)) {
        result.push(element);
      }
    });
  }
  document.getElementById("search").value = "";
  displayData(result);
  document.getElementById(
    "heading"
  ).innerText = `Search result for "${searchText}"`;
}

loadData();
// console.log(headingText)
