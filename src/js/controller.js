import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime"
import { async } from "regenerator-runtime";

const controlRecipes = async function () {
  try {
    const ids = window.location.hash.slice(1);
    if (!ids) return;
    recipeView.renderSpinner();

    // Update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // Loading Recipe
    await model.loadRecipe(ids)

    // Rendering Recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
}
const controlPage = function () {
  // Render Results
  resultsView.render(model.getSearchResultsPage());
  // Render initial Pagination
  paginationView.render(model.state.search);
}
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render Results and initial Page
    controlPage();

  } catch (err) {
    resultsView.renderError();
  }
}

const controlServings = function (serve) {
  if (serve < 1) return;
  // Update the recipe servings (in state)
  model.updateServings(serve)
  // Update the recipe view
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function () {
  // Add or Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else if (model.state.recipe.bookmarked) model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe)

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new Recipe Data
    await model.UploadRecipe(newRecipe)
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success Message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change ID in url
    window.history.pushState(null, "", `3${model.state.recipe.id}`)

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }

}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPage(controlPage);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();
///////////////////////////////////////