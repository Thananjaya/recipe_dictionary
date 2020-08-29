import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value="";
}

export const clearResults = () => {
    elements.searchResultsList.innerHTML = "";
}

const limitRecipeTitle = (title, limit = 25) => {
    const shrimpedtitle =  [] 
    if(title.length > limit){
        title.split(' ').reduce((accumulator, currentValue) => {
            if (accumulator + currentValue.length <= limit){
                shrimpedtitle.push(currentValue)
            }
            return accumulator + currentValue.length;
        },0);

        return `${shrimpedtitle.join(' ')}...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link " href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src=${recipe.image_url} alt=${recipe.title}>
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultsList.insertAdjacentHTML('afterbegin', markup);
}

export const displayResults = recipes => {
    recipes.forEach(element => {
        renderRecipe(element)
    });
}