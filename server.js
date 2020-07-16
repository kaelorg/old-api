const { Ignitor } = require('@adonisjs/ignitor');

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .wsServer()
  .fireHttpServer()
  .catch(console.error);
