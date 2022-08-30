function loadData() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((json) => displayData(json));
}

function displayData(data) {
  const countriesDiv = document.getElementById("countries-container");
  for (const country of data) {
    const countryDiv = document.createElement("div");
    countryDiv.classList.add = "countries";
    countriesDiv.innerHTML += `
          <div class="country-card">
          <div class="flag">
            <img src="${country.flags.svg}" alt="" />
          </div>
          <div class="info">
            <h2 class="country-name">${country.name.common}</h2>
            <h5 class="capital">Capital: ${country.capital}</h5>
            <button onclick="showData('${country.cca2}')">Explore</button>
          </div>
        </div>
        `;
  }
}

function showData(code) {
  const url = `https://restcountries.com/v2/alpha/${code}`
  fetch(url)
  .then(res => res.json())
  .then(data => showCountryDetails(data))
}

function showCountryDetails(country) {
  console.log(country)
  const countryDetalisDiv = document.getElementById('country-detail-container');
  countryDetalisDiv.innerHTML = `
      <button id="close-btn" onclick="closeWindow()">x</button>
      <h2 class="name"> ${country.name} </h2>
      <p class="region">Region: ${country.region}</p>
      <p class="currency">Currency: ${country.currencies[0].symbol} ${country.currencies[0].name}</p>
      <p class="language">Language: ${country.languages[0].name}</p>
      <p class="population">Population: ${country.population}</p>
  `;
  countryDetalisDiv.style.display = 'block';
}

function closeWindow() {
  document.getElementById('country-detail-container').style.display = 'none';
}
loadData();
