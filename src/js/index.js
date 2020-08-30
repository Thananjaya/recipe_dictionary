import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base'; 

/** Global state of the app
 * - search object
 * - current recipe object
 * - shopping list object
 * - liked recipes
 */
const state = {

}


/**
 * Search Controller
 */

const searchController = async () => {
    const query = searchView.getInput();
    if (query) {
        searchView.clearResults();
        renderLoader(elements.searchRes);

        state.search = new Search(query);
        searchView.clearInput();

        await state.search.getSearchResults();
        clearLoader();
        searchView.displayResults(state.search.results);
    }
}

elements.searchButton.addEventListener('submit', e => {
    e.preventDefault();
    searchController()
})

elements.paginationPage.addEventListener('click', event => {
    event.preventDefault();
    const btn = event.target.closest('.btn-inline');
    if(btn) {
        searchView.clearResults();
        const goToPage = parseInt(btn.dataset.goto, 10)
        searchView.displayResults(state.search.results, goToPage);
        console.log(goToPage)
    }
})

/**
 * Recipe controller 
 * */
const recipeController = async () => {
    const recipe = new Recipe(35477);
    await recipe.getRecipe();
    console.log(recipe)
}

recipeController()

