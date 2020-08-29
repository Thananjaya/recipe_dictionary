import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base'; 

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
        state.search = new Search(query);
        await state.search.getSearchResults();
        searchView.displayResults(state.search.results);
    }
}

elements.searchButton.addEventListener('submit', e => {
    e.preventDefault();
    searchController()
})

