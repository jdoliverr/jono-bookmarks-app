// currently just for reference
// const store = {
//     bookmarks: [
//     {
//         id: 'x56w',
//         title: 'Title 1',
//         rating: 3,
//         url: 'http://www.title1.com',
//         description: 'lorem ipsum dolor sit',
//         expanded: false
//     },
//     {
//         id: '6ffw',
//         title: 'Title 2',
//         rating: 5,
//         url: 'http://www.title2.com',
//         description: 'dolorum tempore deserunt',
//         expanded: false
//     }],
//     adding: false,
//     error: null,
//     filter: 0
// };

let error = null;
const bookmarks = [];
let adding = false;
let rating = 1;


const findById = function (id) {
    return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

function addBookmark(bookmark) {
    this.bookmarks.push(bookmark);
};

function findAndUpdate(id, newData) {
    let currentBookmark = this.findById(id);
    Object.assign(currentBookmark, newData);
};

function filterBookmarks() {
    let ratingValue = this.rating;
    let bookmarkList = [...this.bookmarks];
    let filteredBookmarks = [];
    for (let i = 0; i < bookmarkList.length; i++) {
        let currentBookmark = bookmarkList[i];
        if (currentBookmark.rating >= ratingValue) {
            filteredBookmarks.push(currentBookmark);
        };
    };
};

function deleteBookmark(id) {
    this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
    return this.bookmarks
};

function setError(error) {
    this.error = error;
};

export default {
    bookmarks,
    addBookmark,
    setError,
    findById,
    findAndUpdate,
    error,
    adding,
    deleteBookmark,
    rating,
    filterBookmarks
};