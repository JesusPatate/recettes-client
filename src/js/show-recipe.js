import 'bootstrap/dist/js/bootstrap';

import '@/sass/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/fontawesome.css';
// import '@fortawesome/fontawesome-free/css/solid.css';
import '@mdi/font/css/materialdesignicons.css';
import '@/assets/mdi.css';

import client from '@/js/RecettesApiClient.js';

const elt = document.getElementById('recipe-id');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const recipeId = urlParams.get('recipeId');
elt.innerText = JSON.stringify(client.getRecipe(recipeId), null, 2);