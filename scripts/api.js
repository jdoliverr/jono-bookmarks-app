const baseUrl = 'https://thinkful-list-api.herokuapp.com/jonO';

function listApiFetch(...args) {
    let error;
    return fetch(...args)
        .then(res => {
        if (!res.ok) {
          // Valid HTTP response but non-2xx status - let's create an error!
            error = { code: res.status };
        }
        // In either case, parse the JSON stream:
        return res.json();
        })

        .then(data => {
        // If error was flagged, reject the Promise with the error object
        if (error) {
            error.message = data.message;
            return Promise.reject(error);
        }
        // Otherwise give back the data as resolved Promise
        return data;
        })
};

function getBookmarks() {
    return listApiFetch(`${baseUrl}/bookmarks`)
};
// not sure how to handle multiple form inputs at once
function createBookmark(title, url, rating, description) {
    let newBookmark = {
        title: title,
        url: url,
        rating: rating,
        desc: description,
        expanded: false
    };
    let newBookmarkString = JSON.stringify(newBookmark);
    return listApiFetch(`${baseUrl}/bookmarks`, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: newBookmarkString
    });
};

function deleteBookmark(id) {
    return listApiFetch(`${baseUrl}/bookmarks/${id}`, {
        method: 'DELETE',
        headers: new Headers({'Content-Type': 'application/json'})
    });
};

export default {
    getBookmarks,
    createBookmark,
    deleteBookmark
};