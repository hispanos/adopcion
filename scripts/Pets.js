export default class Pets {

    constructor() {
        this.containerPetList = document.getElementById('container-pets-list');
        this.container = document.getElementById('container');
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

        //Set image gender
        let imageGender = 'gender-male.png';
        details.gender === 'Female' ? imageGender = 'gender-female.png' : imageGender

        const HTML = `
        <div class="container-img-details">
            <img src="${details.image}" alt="${details.name}" class="img-details">
            <a href="./select-category.html" class="link-back"><img src="./images/back.png" alt="Atrás"></a>
        </div>
        <div class="container-details">
            <div class="details-basics">
                <div class="details-name-favorite">
                    <div class="details-name-gender">
                        <h4 class="name-details">${details.name}</h4>
                        <img src="./images/${imageGender}" alt="${details.gender}" class="img-gender-details">
                    </div>
                    <div class="favorite-details" id="favorite-heart">
                        <img src="./images/heart-favorite-clicked.png" alt="Favorito" class="img-favorite">
                    </div>
                </div>
                <div class="details-race-age">
                    <div class="details-race">
                        <img src="./images/race.png" alt="Raza" class="img-race-details">
                        <span class="txt-details">${details.race}</span>
                    </div>
                    <div class="details-age">
                        <img src="./images/age.png" alt="Edad" class="img-age-details">
                        <span class="txt-details">${details.age}</span>
                    </div>
                </div>
                <div class="details-address">
                    <img src="./images/address.png" alt="Dirección">
                    <span class="txt-details">${details.address}</span>
                </div>
            </div>
            <div class="details-personality">
                <h5 class="personality-title">Personalidad</h5>
                <div class="personalities-list-details" id="personalities">
                
                </div>
            </div>
            <div class="history-details">
                <h5 class="personality-title">Historia de ${details.name}</h5>
                <p class="history-text-details">${details.description}</p>
            </div>
            <div class="footer-details">
                <div class="author-details">
                    <img src="./images/author.png" alt="Autor" class="img-author-details">
                    <div class="info-author-details">
                        <span class="by-author-details">Publicado por:</span>
                        <span class="name-author-details">Mailer Martínez</span>
                    </div>
                </div>
                <a href="./contact.html" class="btn-contact">Contactar</a>
            </div>
        </div>
        `;

        this.container.innerHTML = HTML;

        //Fill the personalities
        this.renderPersonalities(details.personality)
    }

    //Render the personalities of a pet
    renderPersonalities(personalities) {
        let image = '';

        const containerPersonalities = document.getElementById('personalities');
        personalities.forEach(element => {

            switch(element) {
                case "Juguetón":
                    image = "personality-player.png";
                break;

                case "Inquieto":
                    image = "personality-noquiet.png";
                break;

                case "Tierno":
                    image = "personality-ternure.png";
                break;

                case "Cariñoso":
                    image = "personality-lovely.png";
                break;

                default :
                    image = "personality-player.png";
                break;
            }

            const view = `
            <div class="personality-item-details">
                <img src="./images/${image}" alt="${element}" class="img-personality">
                <span class="personality-text">${element}</span>
            </div>
            `;
            containerPersonalities.innerHTML += view;
        });
    }

}