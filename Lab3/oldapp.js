async function insertIngredients(){
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const response = await fetch(url);
    const data = await response.json();
    let select = document.getElementById("ingredients");
    for(index in data.drinks){
        select.options[select.options.length] = new Option(data.drinks[index].strIngredient1, index)
    }
}

async function addCocktails(){
    //clear the conatiner evertime addCocktails is called
    let results = document.getElementById('results');
    results.innerHTML = " ";

    //gets access to ingredients list
    const ingredientsURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const ingredientsResponse = await fetch(ingredientsURL);
    const ingredientsData = await ingredientsResponse.json();

    //get url with selected ingredient
    let theSelect = document.getElementById('ingredients');
    const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
    //replaces spaces with %20 to get access to other api
    const replaceIngredientChosen = theSelect.options[theSelect.selectedIndex].text;
    let ingredientChosen = replaceIngredientChosen.replace(" ", "%20");
    let completeURL = drinksURL + ingredientChosen;
    
    //get the results container and fetch data needed to put into results
    const theCocktailsResponse = await fetch(completeURL);
    const theCocktailData = await theCocktailsResponse.json();

    for(let i = 0; i < theCocktailData.drinks.length; i++){
        let temp = document.createElement("div");
        temp.className = "results";
        let tempdetails = document.createElement("div");
        const idURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="
        let tempid = theCocktailData.drinks[i].idDrink;
        let theURL = idURL+tempid;
        const idResponse = await fetch(theURL);
        const idData = await idResponse.json();
        tempdetails.className = "details";
        temp.id = theCocktailData.drinks[i].idDrink;
        let tempimage = document.createElement("img");
        tempimage.src = theCocktailData.drinks[i].strDrinkThumb;
        let temppara = document.createElement("p");
        temppara.className = "name";
        temppara.innerHTML = theCocktailData.drinks[i].strDrink;
        temp.appendChild(temppara);
        temp.appendChild(tempimage);
        temp.appendChild(tempdetails);
        results.appendChild(temp);
    }
let theevent = document.getElementsByClassName("results");
    for(let i = 0; i < theevent.length; i++){
        let temp = theevent[i];
        let thistempid = theevent[i].id;
        //category
        let tempCategory = document.createElement("p");
        tempCategory.className = "category";
        theevent[i].appendChild(tempCategory);
        //glass
        let tempGlass = document.createElement("p");
        tempGlass.className = "glass";
        theevent[i].appendChild(tempGlass);
        //ingredients
        let tempIngredients = document.createElement("p");
        tempIngredients.className = "ingredients";
        theevent[i].appendChild(tempIngredients);
        //instructions
        let tempInstructions = document.createElement("p");
        tempInstructions.className = "ingredients";
        theevent[i].appendChild(tempInstructions);
    }

}

async function displayCocktailInformation(event){
    const drinkIdURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
    const drinkId = event.target.id;
    const completeDrinkIdURL = drinkIdURL + drinkId;
    const drinkResponse = await fetch(completeDrinkIdURL);
    const drinkData = drinkResponse.json();
    const tempCategory = document.createElement("p");
    console.log(drinkData);
    const tempGlass = document.createElement("p");
    const tempIngredients = document.createElement("p");
    const tempInstructions = document.createElement("p");
    const drinkDetails = event.target;
    drinkDetails.appendChild(tempCategory);
}

let results = document.querySelectorAll(".results");
for(let i = 0; i < results.length; i++){
    results[i].addEventListener("click", displayCocktailInformation);
}

window.addEventListener("onload", insertIngredients());