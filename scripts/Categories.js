export default class Categories {

    constructor() {
        this.containerCategories = document.getElementById('container-categories');
    }

    async getCategories() {
        const URI = '../db/categories.json'
        const resp = await fetch(URI);
        if (resp.ok) {
            const {categories} = await resp.json();
            return categories
        }else{
            return false;
        }
    }

    async renderCategories() {
        const categories = await this.getCategories();
        categories.forEach(category => {
            const div = `
            <div class="category" id="${category.id}">
                <div class="container-img-category">
                    <img src="./images/${category.image}" alt="${category.name}" class="img-category">
                </div>
                <span class="name-category">${category.name}</span>
            </div>
            `;

            this.containerCategories.innerHTML += div; 
        });
    }

}