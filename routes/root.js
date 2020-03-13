async function routes (fastify, options) {
  fastify.get('/', (request, reply) => {
    reply.send('Oh hi');
  });
}

module.exports = routes;
