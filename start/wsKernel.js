/** @type {typeof import('@adonisjs/websocket/src/Ws')} */
const Ws = use('Ws');

const globalMiddleware = [];

const namedMiddleware = {};

Ws.registerGlobal(globalMiddleware).registerNamed(namedMiddleware);
