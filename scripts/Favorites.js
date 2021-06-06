export default class Favorites {

    constructor() {
        this.model = '';
        this.favorites = JSON.parse(localStorage.getItem('favorites'));
        if (!this.favorites || this.favorites.length < 1) {
            this.favorites = [];
        }
    }

    setModel(model) {
        this.model = model;
    }

    async setFavorite(idPet) {
        //If this.favorite has elements
        if (Array.isArray(this.favorites) && this.favorites.length) {
            //Search if this Id exist at this.favorites array
            const element = this.favorites.filter( item => item.id === idPet );

            //If Pet's id exist, remove from Favorites
            if (Array.isArray(element) && element.length) {
                this.deleteFavorite(idPet);
            }else { //If Pet's id don't exist, add to favorites
                await this.saveFavorite(idPet);
            }
        }else{
            await this.saveFavorite(idPet);
        }
    }

    async saveFavorite(idPet) {
        //Get data Pet by Id from model
        const pet = await this.model.getDetails(idPet);
        this.favorites.push(pet);
        //Add to LocalStorage
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        //Update status class
        this.updateStatus(true);
    }

    deleteFavorite(idPet) {
        this.favorites.forEach((element, index) => {
            if (element.id === idPet) {
                //Delete the pet from array
                this.favorites.splice(index, 1);
            }
        });
        //Updated localStorage
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        //Update status class
        this.updateStatus(false);
    }

    //Update class inactive or active
    updateStatus(isFavorite) {
        const image = document.getElementById('img-favorite');
        if (isFavorite) {
            image.classList.remove('img-favorite');
            image.classList.add('img-favorite-active');
        }else {
            image.classList.remove('img-favorite-active');
            image.classList.add('img-favorite');
        }
    }

    //Search if Id is favorite
    getFavoriteById(idPet) {
        let isFavorite = false;
        this.favorites.forEach(element => {
            element.id === idPet ? isFavorite = true : isFavorite;
        });
        return isFavorite;
    }

    getFavorites() {
        return this.favorites;
    }

}