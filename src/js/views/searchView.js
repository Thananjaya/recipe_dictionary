import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value="";
}

export const clearResults = () => {
    elements.searchResultsList.innerHTML = "";
    elements.paginationPage.innerHTML = "";
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

const nextButton = (page) => {
    return `  
        <button class="btn-inline results__btn--next" data-goto=${page+1}>
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>
        </button>
    `
} 

const prevButton = (page) => {
    return`
        <button class="btn-inline results__btn--prev" data-goto=${page - 1}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
        </button>
    `
}

const renderPaginationButtons = (page, totalRecordCount, resPerPage) => {
    const pages = Math.ceil(totalRecordCount / resPerPage);

    let button;
    if (pages > 1) {
        if(page === 1) {
            button = nextButton(page)
        } else if(page < pages) {
            button = `
                ${nextButton(page)}
                ${prevButton(page)} 
            `
        } else if(pages === page) {
            button = prevButton(page)
        }
    }

    elements.paginationPage.insertAdjacentHTML('afterbegin', button);
};

export const displayResults = (recipes, page = 1, countPerPage = 10) => {
    const firstRecord = (page - 1) * countPerPage;
    const lastRecord = firstRecord + countPerPage;

    recipes.slice(firstRecord, lastRecord).forEach(element => {
        renderRecipe(element)
    });

    renderPaginationButtons(page, recipes.length, countPerPage);
}
