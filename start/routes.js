/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

// Auth Routes

Route.group('Auth', () => {
  Route.get('/redirect', 'AuthController.redirect');
  Route.get('/callback', 'AuthController.authenticate');
  Route.get('/verify', 'AuthController.verify').middleware('auth');
}).prefix('/auth');

// User Routes

Route.group('Users', () => {
  Route.get('/:userId', 'UserController.user');
  Route.get('/@me/guilds', 'UserController.userGuilds');
  Route.get('/@me/guilds/:guildId', 'UserController.userGuild');

  // Edit user

  Route.put('/@me/profile', 'UserController.editUserProfile').validator(
    'UserProfile',
  );
})
  .prefix('/users')
  .middleware(['auth', 'discord']);
