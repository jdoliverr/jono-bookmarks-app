import store from './store.js';
import api from './api.js';
import handlers from './handlers.js';


function main() {
    api.getBookmarks()
    .then((bookmarks) => {
        bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
        handlers.render();
    });
    handlers.bindHandlers();
    handlers.render();
};

$(main);