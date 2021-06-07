import Pets from './Pets.js';
import Categories from './Categories.js'
import Favorites from './Favorites.js';
import Messages from './Messages.js';
import Authors from './Authors.js';

const URI = window.location.pathname;
const pets = new Pets();
const categories = new Categories();
const favorites = new Favorites();
const messages = new Messages();
const authors = new Authors();


document.addEventListener('DOMContentLoaded', () => {
    //Validate URL for waiting index redirection
    if(URI === '/' || URI === '/index.html' || URI === '/adopcion/' || URI === 'adopcion/index.html') {
        setTimeout("window.location.href='./waiting-1.html'", 5000);
    }

    //Render the categories List
    if (URI === '/select-category.html' || URI === '/adopcion/select-category.html') {
        renderCategories();
    }

    if(URI === '/detailsPets.html' || URI === '/adopcion/detailsPets.html') {
        getDetailsPet();
    }

    if(URI === '/favorites.html' || URI === '/adopcion/favorites.html') {
        renderFavorites();
    }

    if(URI === '/messagesDetail.html' || URI === '/adopcion/messagesDetail.html') {
        renderMessagesContent();
    }
    
    //Set Pets Object as model to favorites
    favorites.setModel(pets);
    pets.setFavorites(favorites);
    messages.setAuthors(authors);

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
    categories.changeStatusCategory(id); //Change the class for active
    getPetsByCategory(id);
}

const getPetsByCategory = async (categoryId) => {
    const listPets = await pets.getPets(categoryId);
    pets.renderListPets(listPets);

    const divPet = document.querySelectorAll('.pet');
    divPet.forEach(div => {
        div.addEventListener('click', (e) => { onClickPet(e) })
    });
}

const onClickPet = (e) => {
    const idPet = e.target.parentElement.getAttribute('key');
    window.location.href = `./detailsPets.html?id=${idPet}`;
}

const getDetailsPet = async () => {
    let params = new URLSearchParams(location.search);
    const idPet = parseInt(params.get('id'));
    const details = await pets.getDetails(idPet);
    pets.renderDetails(details);

    const btnFavorite = document.getElementById('favorite-heart');
    btnFavorite.addEventListener('click', onClickFavorite )
}

const onClickFavorite = () => {
    let params = new URLSearchParams(location.search);
    const idPet = parseInt(params.get('id'));
    favorites.setFavorite(idPet);
}

const renderFavorites = () => {
    const listPets = favorites.getFavorites();
    pets.renderListPets(listPets);

    const divPet = document.querySelectorAll('.pet');
    divPet.forEach(div => {
        div.addEventListener('click', (e) => { onClickPet(e) })
    });
}

const renderMessagesContent = async () => {
    let params = new URLSearchParams(location.search);
    const idAuthor = parseInt(params.get('idAuthor'));
    const author = await authors.getAuthorsById(idAuthor);
    messages.renderHeaderMessage(author);
    messages.renderMessages(idAuthor);

    const inputText = document.getElementById('inputText');
    inputText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = inputText.value;
            messages.sendMessage(message, author);
        }
    })

    const goBack = document.getElementById('go-back');
    goBack.addEventListener('click', () => {
        history.go(-1);
    })
}