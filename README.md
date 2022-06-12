# file-picker-test

Test of react native file picker and uploading the image to a server.

I was finally able to get this to work for a single file. I may come back to this for multiple files...

Notes on asyncUpload:
It doesn't return a standard http response, it formats its own and just returns:

- status: the error code
- header: the http header returned from the server
- body: whatever the server "sends" back - in my case it is JSON. Note, that if the server is unresponsive or it is a bad URL, it returns an HTML error page, not a standard error message string (which I find an odd choice since this is react native and I'm not necessarily navigating to a new page when I do an upload, I capture the string in a state object to post the response).

To do this with multiple files, I may need to figure out how to iterate through to do that. It might also be that I can put in a series of `fileUri`s to do multiple.

The multipart form doesn't use a FormData object. It uses a record object. This is a simple key/value pair so it is actually easier to produce.
