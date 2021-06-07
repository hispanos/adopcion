export default class Authors {

    async getAuthorsById(idAuthor) {
        const URI = 'https://my-json-server.typicode.com/hispanos/db-adopcion/authors'
        const resp = await fetch(URI);
        let details = {};
        if (resp.ok) {
            const authors = await resp.json();
            const filter = authors.filter((item) => item.id === idAuthor)
            //If the idAuthor exist return the object unique
            filter.length >= 1 ? details = filter[0] : details;
            return details;
        }else{
            return false;
        }
    }

}