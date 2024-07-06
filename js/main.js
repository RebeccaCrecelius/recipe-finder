const appId = "YOUR ID";
const appKey = "YOUR KEY";
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;
const recipeContainer = document.querySelector("#recipe-container");
const txtSearch = document.querySelector("#txtSearch");
const btnFind = document.querySelector(".btn");
const loadingEle = document.querySelector("#loading");

btnFind.addEventListener("click", () => loadRecipies(txtSearch.value));

txtSearch.addEventListener("keyup", (e) => {
    const inputVal = txtSearch.value;
    if (e.keyCode === 13) {
        loadRecipies(inputVal)
    }
})

const toggleLoad = (elements, isShow) => {
    elements.classList.toggle("hide", isShow);
};
const setScrollPosition = () => {
    recipeContainer.scrollTo({ top: 0, behavior: "smooth" });
};

function loadRecipies(type = "fish") {
    const url = baseUrl + `&q=${type}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            renderRecipes(data.hits);
            toggleLoad(loadingEle, false);
        })
        .catch((error) => toggleLoad(loadingEle, true))
        .finally(() => setScrollPosition());
}

loadRecipies();

const getRecipeStepsStr = (ingredientLines = []) => {
    let str = "";
    for (var step of ingredientLines) {
        str = str + `<li>${step}<li>`;
    }
    return str;
};

const renderRecipes = (recipeList = []) => {
    recipeContainer.innerHTML = "";
recipeList.forEach((recipeObj) => {
        const { 
            label: recipeTitle, 
            url,
            ingredientLines,
            image: recipeImage 
    } = recipeObj.recipe;
    const recipeStepsStr = getRecipeStepsStr(ingredientLines);
    const htmlStr = ` <div class="recipe">
    <div class="recipe-title">${recipeTitle}</div>
    <div class="recipe-image">
        <img src="${recipeImage}" alt="Recipe">
    </div>
    <div class="recipe-text">
        <ul>
            ${recipeStepsStr}
            <a href = ${url} target="_blank">${url}</div>
        </ul>
    </div>
</div>`;
recipeContainer.insertAdjacentHTML("beforeend", htmlStr)

}); 
}; 