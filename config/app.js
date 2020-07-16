/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

module.exports = {
  appKey: Env.getOrFail('APP_KEY'),
  name: Env.get('APP_NAME', 'AdonisJs'),
  views: {
    cache: Env.get('CACHE_VIEWS', true),
  },
  locales: {
    locale: 'en',
    loader: 'file',
  },
  static: {
    dotfiles: 'ignore',
    etag: true,
    extensions: false,
  },
  cookie: {
    path: '/',
    maxAge: 7200,
    httpOnly: true,
    sameSite: false,
  },
  http: {
    jsonpCallback: 'callback',
    subdomainOffset: 2,
    etag: false,
    trustProxy: false,
    allowMethodSpoofing: true,
  },
  logger: {
    transport: 'console',
    console: {
      level: 'info',
      driver: 'console',
      name: 'adonis-app',
    },
    file: {
      level: 'info',
      driver: 'file',
      name: 'adonis-app',
      filename: 'adonis.log',
    },
  },
};
