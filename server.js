const pem = require('pem');
const https = require('https');
const { Ignitor } = require('@adonisjs/ignitor');

pem.createCertificate({ days: 1, selfSigned: true }, (error, keys) => {
  if (error) return console.error(error);

  new Ignitor(require('@adonisjs/fold'))
    .appRoot(__dirname)
    .wsServer()
    .fireHttpServer(handler => {
      return https.createServer(
        {
          key: keys.serviceKey,
          cert: keys.certificate,
        },
        handler,
      );
    })
    .catch(console.error);
});
