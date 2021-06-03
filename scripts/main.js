import Pets from './Pets.js';
import Categories from './Categories.js'

const URI = window.location.pathname;
const pets = new Pets();
const categories = new Categories();


document.addEventListener('DOMContentLoaded', () => {
    //Validate URL for waiting index redirection
    if(URI === '/' || URI === '/index.html' || URI === '/adopcion/' || URI === 'adopcion/index.html') {
        setTimeout("window.location.href='./waiting-1.html'", 5000);
    }

    //Render the categories List
    renderCategories();
});

const renderCategories = async () => {
    await categories.renderCategories();

    //Events click over categories
    const category = document.querySelectorAll('.category');
    category.forEach((div) => {
        div.addEventListener('click', (e) => { onClickCategory(e) })
    })
}

const onClickCategory = (e) => {
    const element = e.target;
    let id = '';
    if (element.id) {
        id = element.id
    }else if (element.parentElement.id) {
        id = element.parentElement.id
    }else if (element.parentElement.parentElement.id) {
        id = element.parentElement.parentElement.id
    }
    getPetsByCategory(id);
}

const getPetsByCategory = async (categoryId) => {
    const listPets = await pets.getPets(categoryId);
    pets.renderListPets(listPets);
}