const dataUsers = require("../fakedata");

const Router = (fastify, options, done) => {
  // GET all users
  fastify.get('/getUser', (req, res) => {
    console.log('GET all users');
    res.code(200).send(dataUsers);
  });

  // GET user by ID
  fastify.get('/getUser/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    console.log(`GET user by ID: ${userId}`);
    const user = dataUsers.find(u => u.id === userId);
    if (user) {
      res.code(200).send(user);
    } else {
      res.code(404).send({ error: 'User not found' });
    }
  });

  // POST add new user
  fastify.post('/addUser', (req, res) => {
    const { id, name, email, telephone } = req.body;
    console.log('POST add new user:', req.body);
    const newUser = {
      id: id ? parseInt(id) : dataUsers.length + 1,
      name,
      email,
      telephone
    };
    dataUsers.push(newUser);
    res.code(201).send(newUser);
  });

  // PUT update user by ID
  fastify.put('/updateUser/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    console.log(`PUT update user by ID: ${userId}, Body:`, req.body);
    const index = dataUsers.findIndex(u => u.id === userId);
    if (index !== -1) {
      dataUsers[index] = {
        id: userId,
        name: req.body.name,
        email: req.body.email,
        telephone: req.body.telephone
      };
      res.code(200).send(dataUsers[index]);
    } else {
      res.code(404).send({ error: 'User not found' });
    }
  });

  // DELETE user by ID
  fastify.delete('/deleteUser/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    console.log(`DELETE user by ID: ${userId}`);
    const index = dataUsers.findIndex(u => u.id === userId);
    if (index !== -1) {
      const deletedUser = dataUsers.splice(index, 1);
      res.code(200).send(deletedUser[0]);
    } else {
      res.code(404).send({ error: 'User not found' });
    }
  });

  done();
};

module.exports = Router;
