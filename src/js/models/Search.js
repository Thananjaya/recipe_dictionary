import axios from 'axios';

export default class Search {
    constructor(query){
        this.searchKeyword = query;
    }

    async getSearchResults(){
        try {
            this.results = await axios.get(`https://forkify-api.herokuapp.com/api/search?q=${this.searchKeyword}`)
            .then(function(response){
                return response.data.recipes
            })
        } catch(error){
            alert(error)
        }        
    }
}
