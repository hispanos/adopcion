export default class Categories {

    constructor() {
        this.containerCategories = document.getElementById('container-categories');
        this.categories = [];
    }

    async getCategories() {
        const URI = 'https://evircol.com/adopcion/db/categories.json'
        const resp = await fetch(URI);
        if (resp.ok) {
            const {categories} = await resp.json();
            //Save the categories at the array's object
            this.categories = categories;
            return categories;
        }else{
            return false;
        }
    }

    async renderCategories() {
        const categories = await this.getCategories();
        categories.forEach((category, index) => {
            //Validate the first category active, others will be inactive
            let isActive = null;
            index === 0 ?  isActive = true : isActive;
            const div = `
            <div class="category ${!isActive ? 'category-inactive' : ''}" id="${category.id}">
                <div class="container-img-category">
                    <img src="./images/${category.image}" alt="${category.name}" class="img-category">
                </div>
                <span class="name-category">${category.name}</span>
            </div>
            `;

            this.containerCategories.innerHTML += div; 
        });
    }

    //Set active or inactive class to categories
    changeStatusCategory(id) {
        let divCategory = '';
        this.categories.forEach(category => {
            divCategory = document.getElementById(category.id);
            if (category.id === id) {
                divCategory.classList.remove('category-inactive')
            }else{
                divCategory.classList.add('category-inactive')
            }
        });
    }

}
