const commands = [];

const aceProviders = [];

const aliases = {
  Ws: 'Adonis/Addons/Ws',
};

const providers = [
  '@adonisjs/ally/providers/AllyProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/websocket/providers/WsProvider',
  '@adonisjs/framework/providers/AppProvider',
  'adonis-mongoose-model/providers/MongooseProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
];

module.exports = { providers, aceProviders, aliases, commands };
