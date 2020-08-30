import axios from 'axios';

export default class Recipe{
    constructor(id) {
        this.id = id;
    }

    async getRecipe(){
        try {
            const result = await axios.get(`https://forkify-api.herokuapp.com/api/get?rId=35477`)
                .then(function(response){
                    return response.data.recipe
                })
                this.title = result.title;
                this.publisher = result.publisher;
                this.image = result.img_url;
                this.url = result.source_url;
                this.ingredients = result.ingredients;
        } catch(error) {
            alert(error);
        }
    }

    calcTime() {
        const totalIngredients = this.ingredients.length;
        const periods = Math.ceil(totalIngredients / 3);
        this.time = peiods * 15;
    }

    calcServings(){
        this.servings = 4;
    }
} 

