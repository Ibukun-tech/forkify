import icons from '../img/icons.svg';
import searchView from './view/searchView.js';
import 'core.js';
import 'regenerator-runtime/runtime';
// import { state } from './model.js';
import addRecipeView from './view/addrecipeView.js';
import {
  loadRecipe,
  loadSearchResult,
  state,
  getCurrentPage,
  updateRecipe,
  addBookmark,
  deleteBookmark,
  acceptDataFromUser,
} from './model.js';
import recipeView from './view/recipeView.js';
import bookmarkView from './view/bookmarkView.js';
import resultView from './view/resultsView';
import resultsView from './view/resultsView';
import paginationView from './view/paginationView.js';
if (module.hot) {
  module.hot.accept();
}

// const {
//   results: { search, dataResults },
// } = state;
// console.log(recipeView);
// console.log(icons);
// recipeView.render();
const recipeContainer = document.querySelector('.recipe');

// timeout(5).catch(err => console.log(err));

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
console.log('first project to be built');
// console.log(this);
// const spinnerFunction = function (parentEl) {
//   const htmlMarkup = ` <div class="spinner">
//   <svg>
//     <use href="${icons}.svg#icon-loader"></use>
//   </svg>
// </div>`;
//   parentEl.innerHTML = '';
//   parentEl.insertAdjacentHTML('afterbegin', htmlMarkup);
// };
const getRecipeFunction = async function () {
  // loading the recipe from an API
  // console.log(this);
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    debugger;
    resultView.update(getCurrentPage());
    bookmarkView.update(state.bookMark);
    recipeView.spinnerFunction();
    await loadRecipe(id);
    // resultView.update(getCurrentPage());
    // console.log(res);
    // RENDERING RECIPE
    const { recipe } = state;
    recipeView.render(state.recipe);
    // controlServings();
  } catch (err) {
    // console.log(err);
    recipeView.renderError(err);
  }
  // controlServings();
};
// getRecipeFunction();
// window.addEventListener('hashchange', getRecipeFunction);
const controlSearchResults = async function () {
  try {
    resultView.spinnerFunction();
    const query = searchView.getQuery();
    resultView.spinnerFunction();
    await loadSearchResult(query);
    console.log(state.results.dataResults);
    resultView.render(getCurrentPage());
    paginationView.render(state.results);
  } catch (err) {
    resultView.renderError(err);
    console.log(err);
  }
};
const controlPagination = function (goto) {
  console.log(goto);
  resultsView.render(getCurrentPage(goto));
  paginationView.render(state.results);
  console.log('pagination packing');
};
const controlServings = function (newServings) {
  // update the recipe servings (in state)
  updateRecipe(newServings);

  // update the view as well
  recipeView.update(state.recipe);
  // recipeView.update(getCurrentPage);
  // controlPagination(state.results.page);
};
const renderBookMark = function () {
  bookmarkView.render(state.bookMark);
};
const updateBookmark = function () {
  if (!state.recipe.bookMarked) addBookmark(state.recipe);
  else deleteBookmark(state.recipe.id);
  recipeView.update(state.recipe);

  bookmarkView.render(state.bookMark);
};
const getAdddedRecipeFromUser = async function (added) {
  try {
    addRecipeView.spinnerFunction();
    await acceptDataFromUser(added);
    console.log(state.recipe);
    recipeView.render(state.recipe);
    bookmarkView.render(state.recipe);
    setTimeout(addRecipeView.generateForm(), 2500);
    bookMarkView.render(state.bookMark);
    window.history.pushState(null, '', `#${state.recipe.id}`);
  } catch (err) {
    addRecipeView.renderError(err);
    console.log(err);
  }
};
const init = function () {
  bookmarkView.bookMarkView(renderBookMark);
  recipeView.eventHandler(getRecipeFunction);
  recipeView.addservingsHandler(controlServings);
  recipeView.addBookmarkView(updateBookmark);
  searchView.getSearchItem(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.formSubmission(getAdddedRecipeFromUser);
  // controlServings();
};
init();
// addRecipeView();
