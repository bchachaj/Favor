const fetch = require('./favor_client/node_modules/fetch');

const readSavedItems = () => {
    fetch('./../../saved_items.txt')
        .then((r) => r.text())
        .then((text) => {
            console.log(text)
        })
};


readSavedItems();