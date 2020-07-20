/** @type {typeof import('@adonisjs/websocket/src/Ws')} */
const Ws = use('Ws');

Ws.channel('vanity', 'GuildVanityController');
