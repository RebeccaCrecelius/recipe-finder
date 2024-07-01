const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search'); 
const resultList= document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault;
})

async function searchRecipes () {
    const searchValue = searchInput.ariaValueMax.trim();
    const response = await fetch('')
}
