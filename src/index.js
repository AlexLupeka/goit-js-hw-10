import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

input.addEventListener(
  'input',
  debounce(e => {
    const trimInput = input.value.trim();
    clearHtml();
    if (trimInput !== '') {
      fetchCountries(trimInput).then(countries => {
        if (countries.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countries.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (countries.length >= 2 && countries.length <= 10) {
          renderCountryList(countries);
        } else if (countries.length === 1) {
          renderOneCountry(countries);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderOneCountry(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}"
      alt="Flag of ${country.name.official}" 
      width="30" hight="20">
         <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function clearHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
