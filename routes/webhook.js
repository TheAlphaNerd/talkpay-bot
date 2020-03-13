const {createHmac} = require('crypto');

function createResponseToken(auth, token) {
  const responseToken = createHmac(
    'sha256', auth.consumer_secret
  ).update(token).digest('base64');
  return {
    response_token: `sha256=${responseToken}`
  };
}

async function routes (fastify, options) {  
  fastify.get('/webhook', (request, reply) => {
    if(!request.query.crc_token) {
      return fastify.notFound(request, reply);
    }
    const responseToken = createResponseToken(options.auth, request.query.crc_token);
    reply.send(responseToken);
  });
  
  fastify.post('/webhook', (request, reply) => {
    
  });
}

module.exports = routes;

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