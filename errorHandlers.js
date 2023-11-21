/*
* 404 and Global Error Handlers, code reused from Unit 6 project 
*/

// Error handler for handling non-existent routes
const handle404Error = (req, res, next) => {
    // Create new error to handle non-existent routes
    const error = new Error('error');
    error.status = 404;
    error.message = 'Oops, page not found. Looks like that route does not exist.';
    next(error);
}; 

// Global error handler
const handleGlobalError = (error, req, res, next) => {
    if (error.status === 404) {
        res.render('page-not-found', {error, title: 'Page Not Found'})
    } else {
        error.message = "Sorry! There is a problem connecting to the server."
        // Set error status and send error message to the page 
        res.status(error.status || 500);
        res.render('error', {error, title: 'Server Error'});
    }
};
// exports the error handlers   
module.exports = {handle404Error, handleGlobalError}; 