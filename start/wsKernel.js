const Ws = use('Ws');

const namedMiddleware = {};

const globalMiddleware = [];

Ws.registerGlobal(globalMiddleware).registerNamed(namedMiddleware);
