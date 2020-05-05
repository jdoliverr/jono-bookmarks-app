import store from './store.js';
import api from './api.js';
/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

// takes a bookmark object as an argument
function generateBookmark(bookmark) {
    let newBookmark = `
        <li class='bookmark-list' data-bookmark-id='${bookmark.id}'>
            <button class='expand-bookmark-button'>${bookmark.title}</button>
            <div class='rate-container'>
                <p>Rating: ${bookmark.rating}/5</p>
            </div>
        </li>`;
    if (bookmark.expanded == true) {
        newBookmark = `
            <li class='bookmark-list' data-bookmark-id='${bookmark.id}'>
                <button class='expand-bookmark-button'>${bookmark.title}</button>
                <div class='rate-container'>
                    <p>Rating: ${bookmark.rating}/5</p>
                    <p>
                        ${bookmark.desc} <br>
                        <a href='${bookmark.url}' class='bookmark-link'>Visit Site</a>
                    </p>
                </div>
                <button class='delete-button'>Remove</button>
            </li>`;
    }

    return `${newBookmark}`;
};

function generateAddBookmarkForm() {
    return `
        <h2>New Bookmark</h2>
    
        <label class='bookmark-entry-label' for='bookmark-entry'>Title</label>
        <input type='text' name='bookmark-entry' class='new-bookmark-title js-bookmark-entry' required>
    
        <label class='bookmark-entry-label' for='bookmark-entry'>Url</label>
        <input type='text' name='bookmark-link' class='new-bookmark-url js-bookmark-entry' required>
    
        <label class='bookmark-entry-label' for='bookmark-entry'>Rating</label>
        <input type='number' min='1' max='5' name='bookmark-rating' class='new-bookmark-rating js-bookmark-entry' required>
    
        <label class='bookmark-entry-label' for='bookmark-entry'>Description</label>
        <input type='text' name='bookmark-description' class='new-bookmark-description js-bookmark-entry' required> 
            
        <button type='submit' class='add-bookmark-submit'>Add Bookmark</button>`;
};

function generateBookmarkString(bookmarksList) {
    const bookmarks = bookmarksList.map((bookmark) => generateBookmark(bookmark));
    return bookmarks.join('');
};

function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
        .closest('.bookmark-list')
        .data('bookmark-id');
};


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

// event handler for dropdown menu
function handleRatingDropDown() {
    $('.rating-select').on('change', function() {
        let selectedValue = $(this).val();
        store.rating = selectedValue;
        store.filterBookmarks();
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
        store.adding = !store.adding;
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
    $('.bookmark-container').on('click', '.delete-button', event => {
        event.preventDefault();
        const id = getBookmarkIdFromElement(event.currentTarget);
        api.deleteBookmark(id)
        .then(() => {
            store.deleteBookmark(id);
            render();
        })
        .catch(err => {
            store.setError(err.message);
            render();
        });
    });
};

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render() {
    let bookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.rating);
    const bookmarkListString = generateBookmarkString(bookmarks);
    const bookmarkForm = generateAddBookmarkForm();
    if (store.adding === true ) {
        $('.add-bookmark-form').html(bookmarkForm);
        
    }
    else {
        $('.add-bookmark-form').html('');
        
    };
    $('.bookmark-container').html(bookmarkListString);
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