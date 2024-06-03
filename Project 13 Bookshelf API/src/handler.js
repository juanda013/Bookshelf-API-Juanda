const { nanoid } = require("nanoid");
const books = require('./bookshelf');

const addBookList = (request, h) => {
    const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;
    const addList = {
        name,year,author,summary,publisher,reading,id,updatedAt,finished
    };

    books.push(addList);

    const status = books.filter((book) => book.id ===id).length > 0;

    if (status) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    } else if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',

        });
        response.code(400);
        return response;
    } else if (name == null) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
};

module.exports =  addBookList;