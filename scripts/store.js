
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

const findById = function (id) {
    return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

function addBookmark(bookmark) {
    this.bookmarks.push(bookmark);
};

function findAndUpdate(id, newData) {
    let currentBookmark = this.findById(id);
    Object.assign(currentBookmark, newData);
}
function filterRating(selectedRating) {
    this.bookmarks.filter(bookmark => bookmark.rating >= selectedRating);
};

function setError(error) {
    this.error = error;
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */








export default {
    bookmarks,
    addBookmark,
    filterRating,
    setError,
    findById,
    findAndUpdate,
    error,
    adding
};