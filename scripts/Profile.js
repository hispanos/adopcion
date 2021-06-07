export default class Profile {

    constructor() {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        if (!this.profile || this.profile === {}) {
            this.profile = {};
        }
        this.name = document.getElementById('name');
        this.lastname = document.getElementById('lastname');
        this.email = document.getElementById('email');
        this.tagName = document.getElementById('tag-name');
        this.form = document.getElementById('form-profile');
        this.image = document.getElementById('img-profile');
        this.inputImage = document.getElementById('input-photo-profile');
    }

    renderProfile() {
        if (Object.keys(this.profile).length >= 1) {
            this.name.value = this.profile.name;
            this.lastname.value = this.profile.lastname;
            this.email.value = this.profile.email;
            this.tagName.innerText = this.profile.name

            //If exist image saved at profile
            if (this.profile.image) {
                this.image.src = this.profile.image
            }
        }
    }

    //Save the profile at localstorage amd object
    saveProfile() {
        this.profile.name = this.name.value;
        this.profile.name = this.name.value,
        this.profile.lastname = this.lastname.value,
        this.email.email = this.email.value
        //Save at localstorage
        localStorage.setItem('profile', JSON.stringify(this.profile));
        //Update the view
        this.renderProfile();
    }

    //Update the image profile
    changeImage() {
        this.inputImage.addEventListener('change', () => {
            const files = this.inputImage.files;
            if (files && files.length) {
                const newImage = files[0];
                const urlNewImage = URL.createObjectURL(newImage);
                this.image.src = urlNewImage;
                //Set the image at object Profile
                this.profile.image = urlNewImage;
                //Save
                this.saveProfile();
            }
        })
    }

}