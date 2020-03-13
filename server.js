// Inspired by twitter-autohook
// https://github.com/twitterdev/autohook
// MIT
'use strict';
const Fastify = require('fastify');

const validateWebhook = require('./routes/validate-webhook');
const handleWebhook = require('./routes/handle-webhook');
const webhook = require('./routes/webhook');
const root = require('./routes/root');

const port = process.env.PORT || 8000;

const auth = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

const fastify = Fastify({
  logger: true
});

fastify.decorate('notFound', (request, reply) => {
  reply.code(404).type('text/html').send('Not Found');
})

fastify.setNotFoundHandler(fastify.notFound);

fastify.register(root);
fastify.register(webhook, {
  auth
});

fastify.listen(port, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});

// const server = http.createServer(async (req, res) => {
//   console.log(`request received for: ${req.url}`);
//
//   const route = url.parse(req.url, true);
//   if (route.query.crc_token) {
//     validateWebhook(auth, route.query.crc_token, res);
//     return;
//   }
//
//   if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
//     try {
//       await handleWebhook(auth, req);
//       res.writeHead(200)
//     }
//     catch (e) {
//       console.error(e);
//       res.writeHead(500);
//     }
//     finally {
//       res.end();
//     }
//     return;
//   }
//
//   if (req.url !== '/') {
//     res.writeHead(404);
//     res.write('404\'d');
//     res.end();
//     return;
//   }
//
//   res.writeHead(200);
//   res.write('Oh hi');
//   res.end();
// });
