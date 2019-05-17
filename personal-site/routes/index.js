const blogRoutes = require('./blog_routes');

module.exports = (app, db) => {
    blogRoutes(app, db);
}
