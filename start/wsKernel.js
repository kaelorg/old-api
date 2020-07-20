/** @type {typeof import('adonis-websocket/src/Ws')} */
const Ws = use('Ws');

const globalMiddleware = [];

const namedMiddleware = {};

Ws.registerGlobal(globalMiddleware).registerNamed(namedMiddleware);
