/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/users', 'UserController.main');

// Auth Routes
Route.get('/auth/redirect', 'AuthController.redirect');
Route.get('/auth/callback', 'AuthController.authenticate');
Route.get('/auth/verify', 'AuthController.verify').middleware('auth');
