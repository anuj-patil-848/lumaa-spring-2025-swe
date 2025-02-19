const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Entities/User'); 


async function createUser(req, res) {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username is already taken.' });
    }
  
    // Create  new user.
    const newUser = await User.create({ username, password });
  
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Search for user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Username not found!' });
    }

    // Compare provided password with hashed password 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Generate a jwt
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,  
      { expiresIn: '1h' }
    );

    // Returns token
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  createUser,
  loginUser,
};
