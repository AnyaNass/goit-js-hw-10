import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const searchField = document.querySelector('#search-box');
const countryList = document.querySelector(".country-list")

searchField.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
	const countryName = searchField.value;
	console.log(searchField.value);

	fetchCountries(countryName)
		.then(countries => {
			console.log(countries);
			if (countries.length > 10) {
				return Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`)
			}
			renderCountryList(countries)
		})
		.catch(err => console.log(err))
}

function fetchCountries(name) {
	return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,languages,population`)
		.then(countries => countries.json())
}


function renderCountryList(countries) {
	const murkap = countries.map(country => {
		console.log(country);
		return `	<li><img src="${country.flags.svg}" alt="${country.name.official}" width="30" height="30"><h2>${country.name.official}</h2><p><span>capital</span>${country.capital}</p>
		<p><span>population</span>${country.population}</p>
		<p><span>languages</span>${Object.values(country.languages)}</p>
	</li>`
	}).join('');
	countryList.innerHTML = murkap;
}

























// function onInput() {
// 	const searchName = searchField.value;

// 	fetchCountries(searchName)
// 		.then(country => {
// 			console.log(country);
// 		})
// 		.catch(err => console.log(err))

// 	function fetchCountries(searchName) {
// 		return fetch(`https://restcountries.com/v3.1/name/${searchName}`)
// 			.then(response => response.json())
// 	}
// }

// fetchCountries()
// 	.then(country => {
// 		console.log(country);
// 	})
// 	.catch(err => console.log(err))



// fetch(`https://restcountries.com/v2/all?fields=name,capital,population,flags,languages`)
// 	.then(response => response.json())
// 	.then(country => {
// 		console.log(country[0].name.common);
// 		const murkap = `<li class="country-list__item">${country[0].name.common}</li>`;
// 		console.log(murkap);
// 		countryList.innerHTML = murkap;
// 	}
// 	)
// 	.catch(err => console.log(err))
