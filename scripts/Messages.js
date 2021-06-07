export default class Messages {

    constructor() {
        this.authors = '';
        this.headerMessages = document.getElementById('header-details-message');
        this.containerMessages = document.getElementById('container-messages');
        this.messages = JSON.parse(localStorage.getItem('messages'));
        if (!this.messages || this.messages.length < 1) {
            this.messages = [];
        }
    }

    setAuthors(model) {
        this.authors = model;
    }

    renderHeaderMessage(author) {
        const HTML = `
        <a href="#" class="link-back" id="go-back"><img src="./images/back.png" alt="Atrás"></a>
        <img src="./images/${author.image}" alt="Author" class="img-header-deatails-message" id="image-author">
        <span class="author-header-details-message" id="name-author">${author.name}</span>
        `;
        this.headerMessages.innerHTML = HTML;
    }

    renderMessages(idAuthor) {
        let HTML = '';
        //If exist messages generally
        if (Array.isArray(this.messages) && this.messages.length) {
            //Filter messages by Author Id
            const data = this.messages.filter( item => item.author.id === idAuthor );
            //If exist messages with this Id
            if (Array.isArray(data) && data.length) {
                const messages = data[0].messages;
                let styleClass = '';
                messages.forEach(element => {
                    //Set class by author's message
                    element.sender === 'me' ? styleClass = 'message-me' : styleClass = 'message-you'
                    HTML += `
                    <div class="message">
                        <span class="time-message">${element.time}</span>
                        <div class="div-${styleClass}">
                            <p class="body-message ${styleClass}">
                                ${element.message}
                            </p>
                        </div>
                    </div>
                    `;
                });
            }else { // If dno't exist messages with this author
                HTML = `
                <div id="non-message">
                    <h3>Aún no hay mensajes</h3>
                </div>
                `;
            }
        }else {
            HTML = `
            <div id="non-message">
                <h3>Aún no hay mensajes</h3>
            </div>
            `;
        }

        this.containerMessages.innerHTML = HTML;
        //Go to end page
        this.goToEnd();
    }

    sendMessage(message, author) {
        const inputText = document.getElementById('inputText');
        inputText.value = '';

        //Get date
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();

        //Add the message to array
        //Chech if exist messages generally
        if (Array.isArray(this.messages) && this.messages.length) {
            //Filter messages by Author Id
            const data = this.messages.filter( item => item.author.id === author.id );
            //If exist messages with this Id
            if (Array.isArray(data) && data.length) {
                let object = 
                {
                    sender: "me",
                    time: date + '-' + time,
                    message: message
                }

                //Updated the array
                this.messages.forEach((element, index) => {
                    if (element.author.id === author.id) {
                        this.messages[index].messages.push(object);
                        localStorage.setItem('messages', JSON.stringify(this.messages));
                    }
                });
            }else {
                //If don't wxist messages with this autor
                this.createFirstMessage(author, date, time, message);
            }
        }else {
            //If don't exist messages
            this.createFirstMessage(author, date, time, message);
        }

        //Render the new Message
        const sender = 'me';
        this.renderSendedMessage(message, time, sender);
        //Create a automatic response if message don't includes a "No" string
        !message.toLowerCase().includes('#no') ? this.responseAutomatic(author) : '';
        
        //Go to end page
        this.goToEnd();
    }

    createFirstMessage(author, date, time, message) {
        this.containerMessages.innerHTML = '';
        let object = 
        {
            author: {
                id: author.id,
                name: author.name,
                image: author.image
            },
            messages: [
                {
                    sender: "me",
                    time: date + '-' + time,
                    message: message
                }
            ]
        }
        this.messages.push(object);
        localStorage.setItem('messages', JSON.stringify(this.messages));
    }

    renderSendedMessage(message, time, sender) {
        //Show new box text with message
        const HTML = `
        <div class="message">
            <span class="time-message">${time}</span>
            <div class="div-message-${sender}">
                <p class="body-message message-${sender}">
                    ${message}
                </p>
            </div>
        </div>
        `;

        this.containerMessages.innerHTML += HTML;
    }

    responseAutomatic(author) {
        //Wait 3 seconds
        setTimeout(() => {
            //Get date
            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();
    
            const message = "Hola, soy: "+author.name+", te escribí a las "+time+". Si no quieres ver una respuesta, escribe #No en tu mensaje"
            let object = 
            {
                sender: "you",
                time: date + '-' + time,
                message: message
            }
    
            //Updated the array
            this.messages.forEach((element, index) => {
                if (element.author.id === author.id) {
                    this.messages[index].messages.push(object);
                    localStorage.setItem('messages', JSON.stringify(this.messages));
                }
            });
    
            //Render the new Message
            const sender = 'you';
            this.renderSendedMessage(object.message, time, sender)
            //Go to end page
            this.goToEnd();
        }, 3000)
    }

    goToEnd() {
        window.scrollTo(0,document.querySelector("#container").scrollHeight);
    }

}