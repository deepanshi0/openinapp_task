const User = require('../models/User');


exports.register = async (req, res) => {
    try {
      const { username, password, phone_number } = req.body;
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).send('User already exists');
      }
      user = new User({ username, password, phone_number });
      await user.save();
      res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };