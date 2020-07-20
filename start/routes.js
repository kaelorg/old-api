/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

// Auth Routes
Route.group(() => {
  Route.get('/redirect', 'AuthController.redirect');
  Route.get('/callback', 'AuthController.authenticate');
  Route.get('/verify', 'AuthController.verify').middleware('auth');
}).prefix('/auth');

// Authenticated Routes

// Users
Route.group(() => {
  Route.get('/:userId', 'UserController.user');

  // Edit authenticated user
  Route.put('/@me/profile', 'UserController.editProfile').validator(
    'UserProfile',
  );
})
  .prefix('/users')
  .middleware(['auth', 'discord']);

// Guilds
Route.get('/guilds', 'GuildController.guilds').middleware(['auth', 'discord']);

Route.group(() => {
  Route.get('/', 'GuildController.guild');

  // Edit Guild
  Route.post('/vanity', 'GuildController.editVanity').validator('GuildVanity');
  Route.put('/general', 'GuildController.editGeneral').validator(
    'GuildGeneral',
  );
  Route.put('/suggestion', 'GuildController.editSuggestion').validator(
    'GuildSuggestion',
  );
  Route.put('/welcome/:type', 'GuildController.editWelcome').validator(
    'GuildWelcome',
  );
})
  .prefix('/guilds/:guildId')
  .middleware(['auth', 'discord', 'guild']);
