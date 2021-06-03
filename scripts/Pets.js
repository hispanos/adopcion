export default class Pets {

    constructor() {
        this.containerPetList = document.getElementById('container-pets-list');
    }

    async getPets(categoryId) {
        const URI = '../db/pets.json'
        const resp = await fetch(URI);
        if (resp.ok) {
            const {pets} = await resp.json();
            const filter = pets.filter((item) => item.categoryId === categoryId)
            return filter
        }else{
            return false;
        }
    }

    renderListPets(listPets) {
        this.containerPetList.innerHTML = '';
        listPets.forEach(pet => {
            const div = `
            <div class="pet level-1" key=${pet.id}>
                <div class="background-pet"></div>
                <img src="${pet.image}" alt="${pet.name}" class="img-pet">
                <span class="pet-name">${pet.name}</span>
                <span class="pet-race">${pet.race}</span>
            </div>
            `;
            this.containerPetList.innerHTML += div;
        });
    }

}