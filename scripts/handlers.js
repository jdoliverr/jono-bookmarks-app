/* event handler functions
submit add bookmarks
filter submit
expand and condense bookmarks
html generators
*/

import store from './store.js';
import api from './api.js';
/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

// takes a bookmark object as an argument
function generateBookmark(bookmark) {
    let newBookmark = `
        <button class='expand-bookmark-button'>${bookmark.title}</button>
        <div class='rate-container>
            <p>${bookmark.rating}</p>
        </div>`;
    if (bookmark.expanded) {
        newBookmark = `
            <button class='expand-bookmark-button'>${bookmark.title}</button>
            <div class='rate-container'>
                <p>${bookmark.rating}</p>
                <p>
                    ${bookmark.description} <br>
                    <a href='${bookmark.url}'>Visit Site</a>
                </p>
            </div>
            <button class='delete-button'>Remove</button>`;
    }

    return `
        <li class='bookmark-list' data-bookmark-id='${bookmark.id}'>
            ${newBookmark}
        </li>`;
};

// function generateExpandedBookmark(bookmark) {
//     let newBookmark = `
//         <button class='expand-bookmark-button'>${bookmark.title}</button>
//         <div class='rate-container'>
//             <p>${bookmark.rating}</p>
//             <p>
//                 ${bookmark.description} <br>
//                 <a href='${bookmark.url}'>Visit Site</a>
//             </p>
            
//         </div>
//         <button class='delete-button'>Remove</button>`;
    
//     return `
//         <li class='bookmark-list>
//             ${newBookmark}
//         </li>`;
// };

function generateAddBookmarkForm() {
    return `
        <h2>New Bookmark</h2>
    
        <label for='bookmark-entry'>Title</label>
        <input type='text' name='bookmark-entry' class='new-bookmark-title js-bookmark-entry'>
    
        <label for='bookmark-entry'>Url</label>
        <input type='text' name='bookmark-link' class='new-bookmark-url js-bookmark-entry'>
    
        <label for='bookmark-entry'>Rating</label>
        <input type='number' min='1' max='5' name='bookmark-rating' class='new-bookmark-rating js-bookmark-entry'>
    
        <label for='bookmark-entry'>Description</label>
        <input type='text' name='bookmark-description' class='new-bookmark-description js-bookmark-entry'>
            
        <button type='submit' class='add-bookmark-submit'>Add Bookmark</button>`;
};

function generateBookmarkString(bookmarksList) {
    const bookmarks = bookmarksList.map((bookmark) => generateBookmark(bookmark));
    return bookmarks.join('');
};

// function generateExpandedBookmarkString(bookmarksList) {
//     const bookmarks = bookmarksList.map((item) => generateExpandedBookmark(item));
//     return bookmarks.join('');
// }



function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
        .closest('.bookmark-list')
        .data('bookamrk-id');
};


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

// event handler for dropdown menu
function handleRatingDropDown() {
    $('.rating-select').on('change', function(even) {
        let selectedValue = $(this).val();
        store.filterRating(selectedValue);
        render();
    });
};



function handleExpandBookmarkButton() {
    $('.bookmark-container').on('click', '.expand-bookmark-button', event => {
        const id = getBookmarkIdFromElement(event.currentTarget);
        let bookmark = store.findById(id);
        store.findAndUpdate(id, {expanded: !bookmark.expanded});
        render();
});
};

function handleNewBookmarkButton() {
    $('.new-bookmark-button').click(event => {
        event.preventDefault();
        store.adding = true;
        console.log('add');
        render();
});
};

function handleAddItemSubmit() {
    $('.add-bookmark-form').submit(function(event) {
        event.preventDefault();
        const newBookmarkTitle = $('.new-bookmark-title').val();
        const newBookmarkUrl = $('.new-bookmark-url').val();
        const newBookmarkRating = $('.new-bookmark-rating').val();
        const newBookmarkDescription = $('.new-bookmark-description').val();
        $('.js-bookmark-entry').val('');
        api.createBookmark(newBookmarkTitle, newBookmarkUrl, newBookmarkRating, newBookmarkDescription)
            .then((newBookmark) => {
                store.addBookmark(newBookmark);
                store.adding = false;
                render();
            })
            .catch(err => {
                store.setError(err.message);
                render();
            });
    });
};

function handleRemoveBookmarkButton() {
    $('.bookmark-container').on('click', 'delete-button', event => {
        event.preventDefault();
        render();
    });
};

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render() {
    let bookmarks = [...store.bookmarks];
    const bookmarkListString = generateBookmarkString(bookmarks);
    const bookmarkForm = generateAddBookmarkForm();
    if (store.adding === true ) {
        $('.add-bookmark-form').html(bookmarkForm);
        
    }
    else {
        $('.add-bookmark-form').html('');
        
    };
    $('.bookmark-container').html(bookmarkListString);
    console.log(store.adding);
    console.log('render');
};




// calls event handler functions
function bindHandlers() {
    handleRatingDropDown();
    handleAddItemSubmit();
    handleExpandBookmarkButton();
    handleNewBookmarkButton();
    handleRemoveBookmarkButton();
};

export default {
    bindHandlers,
    render
};