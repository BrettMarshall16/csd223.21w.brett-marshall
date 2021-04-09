const Cocktails = {
    data() {
        return {
            // TODO: add a property that stores the input text
            ingredientSelectorText: "",
            selectedIngredients: [],     // TODO: make this an array of ingredients
            expandedDrinkDetails: null,
            _isLoadingDetailsFor: null,
            ingredients: [],
            isLoadingResults: false,
            results: [],
            cache: new Map(),

        }
    },

    methods: {

        initIngredientList: async function() {

            // Pull the ingredients list from the API and add it to the select element
            
            const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    
            if ( ! response.ok ) {
                console.log(new Error("Something went wrong"));
                return;
            }
    
            const data = await response.json();
    
            this.ingredients = data.drinks                         // Grab the drinks array of the returned JSON
                // Convert the drinks array to an array of ingredient names (the strIngredient1 property is the ingredient name)
                .map( i => i.strIngredient1 )
                .sort();                         // Sort the names alphabetically
    
        },

        // TODO: add onIngredientSelected method

        // TODO: add deselectIngredient method
    
        searchByIngredients: async function() {
    
            this.isLoadingResults = true;
            this.results = [];
            let temparray = [];
    
            // TODO: Get all the drinks that contain ALL of the selected ingredients
            
            const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + encodeURIComponent(this.selectedIngredients));
        
            if ( ! response.ok ) {
                console.log(new Error("Something went wrong"));
                return;
            }
        
            const data = await response.json();
            
            // Convert the drinks array into our own drink objects (see makeDrinkSummaryFrom(..) below)
            temparray = data.drinks.map( e => this.makeDrinkSummaryFrom(e) );
            this.results = [...new set([...this.results,...temparray])];
        
            this.isLoadingResults = false;
            
        },
    
        handleResultClick: async function(drinkId) {
            let drinkDetails;
            if ( this.cache.has(drinkId) ) {
                drinkDetails = this.cache.get(drinkId);
            } else {
                this._isLoadingDetailsFor = drinkId;
    
                const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + encodeURIComponent(drinkId));
    
                if ( ! response.ok ) {
                    console.log(new Error("Something went wrong"));
                    return;
                }
    
                const data = await response.json();

                drinkDetails = this.makeDrinkDetailsFrom(data.drinks[0]);
                this.cache.set(drinkDetails.id, drinkDetails);
    
                this._isLoadingDetailsFor = null;
            }
    
            this.expandedDrinkDetails = drinkDetails;
    
        },
        onIngredientSelected: async function(){
            if(this.ingredients.includes(this.ingredientSelectorText)){
                if(!this.selectedIngredients.includes(this.ingredientSelectorText)){
                    this.selectedIngredients.push(this.ingredientSelectorText);
                    this.ingredientSelectorText ="";
                    this.searchByIngredients();
                }
            }
        },

        deselectIngredient: async function(selectedIngredient){
            let theIndex = this.selectedIngredients.indexOf(selectedIngredient);
            delete this.selectedIngredients[theIndex];
            this.searchByIngredients();
        },
    
        isExpanded(drinkId) {
            return this.expandedDrinkDetails?.id === drinkId;
        },
    
        isLoadingDetailsFor(drinkId) {
            return this._isLoadingDetailsFor === drinkId;
        },
    
        makeDrinkSummaryFrom(cocktailDBSummary) {
            // Map the drink objects we get back from CocktailDB to our own structure so that if
            // the CocktailDB API changes, we only have to change the properties here
            return { 
                name: cocktailDBSummary.strDrink, 
                thumbURL: cocktailDBSummary.strDrinkThumb, 
                id: cocktailDBSummary.idDrink
            }
        },
    
        makeDrinkDetailsFrom(cocktailDBData) {
            // Map the drink object we get back from CocktailDB to our own structure so that if
            // the CocktailDB API changes, we only have to change the properties here
            const details = {
                id: cocktailDBData.idDrink,
                name: cocktailDBData.strDrink, 
                thumbURL: cocktailDBData.strDrinkThumb, 
                category: cocktailDBData.strCategory,
                isAlcoholic: (cocktailDBData.strAlcoholic === "Alcoholic" ? true : false),
                glass: cocktailDBData.strGlass,
                instructions: cocktailDBData.strInstructions
            }
        
            // The API uses a number of properties like 'strIngredient1', 'strIngredient2', and 'strMeasure1', 'strMeasure2', etc.
            // Here we convert this to an array of { ingredient, measure } objects
            const ingredients = [];
            for ( let i = 1; i <= 15; ++i ) {
                // Skip empty values
                if ( cocktailDBData['strIngredient'+i] ) { 
                    ingredients[i-1] = {
                        ingredient: cocktailDBData['strIngredient'+i],
                        measure: cocktailDBData['strMeasure'+i]
                    }
                }
            }
            details.ingredients = ingredients;
        
            return details;
        }
    },

    mounted() {
        this.initIngredientList();
    }
}
  
Vue.createApp(Cocktails).mount('#app');