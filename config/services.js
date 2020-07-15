/*
|--------------------------------------------------------------------------
| Services Configuration
|--------------------------------------------------------------------------
|
| This is general purpose file to define configuration for multiple services.
| The below config is for the ally provider. Make sure to save it inside
| config/services.js file.
|
| Happy Coding :)
|
*/

const Env = use('Env');

module.exports = {
  ally: {
    /*
    |--------------------------------------------------------------------------
    | Discord Configuration
    |--------------------------------------------------------------------------
    */
    discord: {
      scope: ['identify', 'guilds'],
      clientId: Env.get('DISCORD_CLIENT_ID'),
      redirectUri: Env.get('DISCORD_REDIRECT_URL'),
      clientSecret: Env.get('DISCORD_CLIENT_SECRET'),
    },
  },
};
