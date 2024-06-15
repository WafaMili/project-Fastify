const fastify = require('fastify')({
    logger: true
  });
  
  const PORT = 3000;
  fastify.register(require('./routes/router'))
 
  const start = async () => {
    try {
      await fastify.listen({port:PORT});
      console.log(`Server is running on port ${PORT}`);
    } catch (error) {
      fastify.log.error(error);
      process.exit(1);
    }
  };
  
  start();
  