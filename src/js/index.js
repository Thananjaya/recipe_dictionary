import Search from './models/Search';
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

