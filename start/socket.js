/** @type {typeof import('@adonisjs/websocket/src/Ws')} */
const Ws = use('Ws');

Ws.channel('vanity', 'GuildVanityController');
Ws.channel('role-all', 'GuildRoleAllController');
Ws.channel('ban-freeze', 'GuildBanFreezeController');
Ws.channel('suggestion', 'GuildSuggestionController');
