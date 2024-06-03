const { addBookList } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookList,
    },
];

module.exports = routes;