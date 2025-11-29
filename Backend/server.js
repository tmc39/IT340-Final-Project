import User from user.js;
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'eventlink-secret-key-2025';

app.use(cors());
app.use(express.json());



//Defines socket to connect to on VM3 for the database
const MONGO_URI = 'mongodb://192.168.56.103:27017/eventlink';

//Connects mongoose to the database
mongoose.connect(MONGO_URI)
.then(() => console.log('Connected to MongoDB on VM3'))
.catch(err => console.error('MongoDB connection error:', err));




app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EventLink API is running' });
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUser._id, fullname: newUser.fullname, email: newUser.email }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, fullname: user.fullname, email: user.email }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`EventLink API running on http://192.168.56.102:${PORT}`);
});
