export default class Messages {

    constructor() {
        this.containerMessages = document.getElementById('container-messages');
        this.messages = JSON.parse(localStorage.getItem('messages'));
        if (!this.messages || this.messages.length < 1) {
            this.messages = [
                {
                    author: {
                        id: 1,
                        name: "Mailer Martínez",
                        image: "author1.png"
                    },
                    messages: [
                        {
                            sender: "me",
                            time: "04:00 pm",
                            message: "Este es un mensaje mío"
                        },
                        {
                            sender: "author",
                            time: "04:00 pm",
                            message: "Este es un mensaje del autor"
                        }
                    ]
                }
            ];
        }
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
    }

}