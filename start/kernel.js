/** @type {import('@adonisjs/framework/src/Server')} */
const Server = use('Server');

const serverMiddleware = ['Adonis/Middleware/Cors'];

const globalMiddleware = [
  'Adonis/Middleware/BodyParser',
  'App/Middleware/ConvertEmptyStringsToNull',
];

const namedMiddleware = {
  guild: 'App/Middleware/Guild',
  auth: 'Adonis/Middleware/Auth',
  client: 'App/Middleware/Client',
  discord: 'App/Middleware/DiscordService',
  guest: 'Adonis/Middleware/AllowGuestOnly',
};

Server.registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(serverMiddleware);
