/*!
 * Module dependencies.
 */

var async = require('async')

/**
 * Controllers
 */

var users = require('../app/controllers/users')
  , home = require('../app/controllers/home')
  , projects = require('../app/controllers/projects')
  , financings = require('../app/controllers/financings')
  , admin = require('../app/controllers/admin')
  , auth = require('./middlewares/authorization')

/**
 * Route middlewares
 */

var projectAuth = [auth.requiresLogin]

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // user routes
  app.get('/login', users.login)
  app.get('/signup', users.signup)
  app.get('/logout', users.logout)
  app.post('/users', users.create)
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session)
  app.get('/users/:userId', users.show)

  app.param('userId', users.user)

  // project routes
  app.get('/projects', projects.index)
  app.get('/projects/new', auth.requiresLogin, projects.new)
  app.post('/projects', auth.requiresLogin, projects.create)
  app.get('/projects/:projectId', projects.show)
  app.get('/projects/:projectId/edit', projectAuth, projects.edit)
  app.put('/projects/:projectId', projectAuth, projects.update)
  app.del('/projects/:projectId', projectAuth, projects.destroy)
 
  app.param('projectId', projects.load)

  // financings routes
  app.get('/financings', financings.index)
  app.get('/financings/new', auth.requiresLogin, financings.new)
  app.post('/financings', auth.requiresLogin, financings.create)
  app.get('/financings/:financingId', financings.show)
  app.get('/financings/:financingId/edit', auth.requiresLogin, financings.edit)
  app.put('/financings/:financingId', auth.requiresLogin, financings.update)
  app.del('/financings/:financingId',  auth.requiresLogin, financings.destroy)
  //  
  app.param('financingId', financings.load)
    
  // home route
  app.get('/', home.index)

  // admin routes
  app.get('/admin', admin.index)
  app.get('/admin/populate', admin.populate)

  // tag routes
  var tags = require('../app/controllers/tags')
  app.get('/tags/:tag', tags.index)

}
