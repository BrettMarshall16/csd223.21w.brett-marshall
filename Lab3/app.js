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
    const results = document.getElementById('results');
    results.innerHTML = " ";
    const theSelect = document.getElementById('ingredients');
    const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
    //replaces spaces with %20 to get access to other api
    const replaceIngredientChosen = theSelect.options[theSelect.selectedIndex].text;
    const ingredientChosen = replaceIngredientChosen.replace(" ", "%20");
    const completeURL = drinksURL + ingredientChosen;
    const theCocktailsResponse = await fetch(completeURL);
    const theCocktailData = await theCocktailsResponse.json();

    for(let i = 0; i < theCocktailData.drinks.length; i++){
        let tempDiv = document.createElement("div");
        tempDiv.className = "results";
        let tempName = document.createElement("button");
        tempName.innerHTML = theCocktailData.drinks[i].strDrink;
        let drinkId = theCocktailData.drinks[i].idDrink;
        tempName.id = drinkId;
        let imgThumb = theCocktailData.drinks[i].strDrinkThumb;
        let tempImgEl = document.createElement("img");
        tempImgEl.src = imgThumb;
        let showResults = document.createElement("div");
        showResults.className = "showresults";
        showResults.id = drinkId;
        tempDiv.appendChild(tempName);
        tempDiv.appendChild(tempImgEl);
        tempDiv.appendChild(showResults);
        results.appendChild(tempDiv);
    }
    let button = document.getElementsByTagName("button");
    for(let i = 0; i < button.length; i++){
        button[i].addEventListener("click", event => getIdOfButtonClicked(event));
    }

}

function getIdOfButtonClicked(event){
    let x = document.querySelectorAll(".results");
    let mytest = x.childNodes;
    let test = event.target.id;
    console.log(event.target.id);
    let y = document.getElementById(test);
    console.log(x);
    console.log(mytest);
}



window.addEventListener("onload", insertIngredients());