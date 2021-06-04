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

    async getDetails(idPet) {
        const URI = '../db/pets.json'
        const resp = await fetch(URI);
        let details = {};
        if (resp.ok) {
            const {pets} = await resp.json();
            const filter = pets.filter((item) => item.id === idPet)
            //If the idPet exist return the object unique
            filter.length >= 1 ? details = filter[0] : details;
            return details;
        }else{
            return false;
        }
    }

    renderDetails(details) {
        //If details is empty show a message
        if (Object.keys(details).length === 0) {
            const message = document.createElement('h3');
            message.innerText = 'No has seleccionado una mascota válida';
            document.getElementById('container').appendChild(message);
            return;
        }
    }

}