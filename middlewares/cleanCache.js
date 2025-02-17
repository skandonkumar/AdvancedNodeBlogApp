const {clearHash} = require('../services/cache')

module.exports = async (req, res, next) => {
    // Clear the cache for the current user
    await next();
    
    // Proceed to the next middleware or route handler
    clearHash(req.user.id);
}