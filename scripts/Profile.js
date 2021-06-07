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
        this.profile.lastname = this.lastname.value,
        this.profile.email = this.email.value
        //Save at localstorage
        localStorage.setItem('profile', JSON.stringify(this.profile));
        //Update the view
        this.renderProfile();
        //Show alert:
        iqwerty.toast.toast('Datos actualizados exitosamente');
    }

    //Update the image profile
    changeImage() {
        this.inputImage.addEventListener('change', () => {
            const files = this.inputImage.files;
            if (files && files.length) {
                const file = files[0];
                //If file is a image
                if (file.type.match('image.*')) {
                    //Set the image to view
                    const urlNewImage = URL.createObjectURL(file);
                    this.image.src = urlNewImage;
                    //Storage the image to base64
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        //Set the image at object Profile
                        this.profile.image = reader.result;
                        console.log(this.profile.image);
                        //Save
                        this.saveProfile();
                    }
                }
            }
        })
    }

}