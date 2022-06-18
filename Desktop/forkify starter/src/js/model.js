import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { getJson, upLoadDatabase } from './helper.js';
export const state = {
  recipe: {},
  results: {
    search: '',
    dataResults: [],
    dataResultsPage: RES_PER_PAGE,
    page: 1,
  },
  bookMark: [],
};
const createRecipeObject = function (data) {
  console.log(data);
  const { recipe } = data.data;
  console.log(recipe);
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    source_url: recipe.source_url,
    img: recipe.image_url,
    servings: recipe.servings,
    cooking_time: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { Key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  console.log(id);
  // console.log(getJson(API_URL + id));
  try {
    const data = await getJson(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    console.log(data);
    // if (!res.ok) {
    //   throw new Error('we have a big problem here');
    // }
    // const data = await res.json();
    // console.log(data.data);
    state.recipe = createRecipeObject(data);
    if (state.bookMark.some(bookMark => bookMark.id === state.recipe.id))
      state.recipe.bookMarked = true;
    else state.recipe.bookMarked = false;
    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    console.log(query);
    // let { search, dataResults } = state.results;
    state.results.search = query;
    console.log(state.results.search);
    const data = await getJson(API_URL + query);
    // query.value = '';
    // if(data.length)
    console.log(data);
    let { recipes } = data.data;
    console.log(recipes);
    // const { dataResults } = state.results;
    // if (recipes.length === 0) {
    //   throw new Error('What you search for we do not have sir/ma');
    // }
    state.results.dataResults = recipes.map(recipe => {
      console.log(recipe.id);
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,

        img: recipe.image_url,
      };
    });
    state.results.page = 1;
    console.log(state.results.dataResults);
    // return dataResults;
  } catch (err) {
    throw err;
  }
};
export const getCurrentPage = function (page = state.results.page) {
  state.results.page = page;
  console.log(page);
  const start = (page - 1) * state.results.dataResultsPage;
  const end = page * state.results.dataResultsPage;
  return state.results.dataResults.slice(start, end);
};
export const updateRecipe = function (newServing) {
  // const { ingredients, servings } = state.recipe;
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });
  state.recipe.servings = newServing;
};

const persistBookmark = function () {
  localStorage.setItem('bookmark', state.bookMark);
};
export const addBookmark = function (recipe) {
  // add a bookmark or push a book mark
  state.bookMark.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookMarked = true;
  persistBookmark();
};
export const deleteBookmark = function (id) {
  const index = state.bookMark.findIndex(index => index.id === id);
  state.bookMark.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookMarked = false;
  persistBookmark();
};
const init = function () {
  const storage = localStorage.getItem('bookmark');
  if (storage) state.bookMark = JSON.parse(storage);
};
init();
export const acceptDataFromUser = async function (addRecipe) {
  try {
    console.log(addRecipe);
    console.log(Object.entries(addRecipe));
    const ingredients = Object.entries(addRecipe)
      .filter(ing => {
        console.log(ing);
        return ing[0].startsWith('ingredient') && ing[1] !== '';
      })
      .map(ing => {
        console.log(ing);
        const ingriArray = ing[1].replaceAll(' ', '').split(',');
        if (ingriArray.length !== 3) throw new Error('incomplete form filling');
        const [quantity, unit, description] = ingriArray;
        const quantityNumber = quantity ? +quantity : null;
        return { quantityNumber, unit, description };
      });
    // console.log(ingridients);
    const recipe = {
      title: addRecipe.title,
      source_url: addRecipe.sourceUrl,
      image_url: addRecipe.image,
      publisher: addRecipe.publisher,
      cooking_time: +addRecipe.cooking_time,
      servings: +addRecipe.servings,
      ingredients,
    };
    const data = await upLoadDatabase(
      `https://forkify-api.herokuapp.com/api/v2/recipes?key=${KEY}`,
      recipe
    );
    console.log(data);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
    // console.log(err);
  }
};
