/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

// User Routes
Route.group('Users', () => {
  Route.get(':userId', 'UserController.user');
  Route.get('@me/guilds', 'UserController.userGuilds');
  Route.get('@me/guilds/:guildId', 'UserController.userGuild');
})
  .prefix('users')
  .middleware(['auth', 'discord']);

// Auth Routes
Route.group('Auth', () => {
  Route.get('redirect', 'AuthController.redirect');
  Route.get('callback', 'AuthController.authenticate');
  Route.get('verify', 'AuthController.verify').middleware('auth');
}).prefix('auth');
