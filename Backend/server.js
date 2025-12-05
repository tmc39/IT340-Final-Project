const express = require('express');
const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Logger function to send logs to VM4 (non-blocking)
const logToService = (level, message, data = {}) => {
  const http = require('http');
  
  const logData = JSON.stringify({
    level,
    service: 'BACKEND-API',
    message,
    data
  });

  const options = {
    hostname: '192.168.56.104',
    port: 5000,
    path: '/log',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(logData)
    }
  };

  const req = http.request(options, (res) => {
    res.on('data', () => {});
  });

  req.on('error', (error) => {
    console.error('Failed to send log:', error.message);
  });

  req.write(logData);
  req.end();
};

const app = express();
const PORT = 3000;
const JWT_SECRET = 'eventlink-secret-key-2025';

app.use(cors({
  origin: true,
  credentials: true
}));

// Manual CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

const MONGO_URI = 'mongodb://192.168.56.103:27017/eventlink';

mongoose.connect(MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB on VM3');
  logToService('INFO', 'Backend connected to MongoDB', { mongoUri: MONGO_URI });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  logToService('ERROR', 'MongoDB connection failed', { error: err.message });
});

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EventLink API is running' });
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    logToService('INFO', 'User registration attempt', { email });

    if (!fullname || !email || !password) {
      logToService('WARN', 'Registration failed: Missing fields', { email });
      return res.status(400).json({ error: 'All fields required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logToService('WARN', 'Registration failed: User already exists', { email });
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword
    });

    await newUser.save();

    logToService('INFO', 'User registered successfully', { email, userId: newUser._id.toString() });

    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUser._id, fullname: newUser.fullname, email: newUser.email }
    });

  } catch (error) {
    console.error('Register error:', error);
    logToService('ERROR', 'Registration error', { error: error.message });
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    logToService('INFO', 'User login attempt', { email });

    if (!email || !password) {
      logToService('WARN', 'Login failed: Missing credentials', { email });
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      logToService('WARN', 'Login failed: User not found', { email });
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logToService('WARN', 'Login failed: Invalid password', { email });
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    logToService('INFO', 'User logged in successfully', { email, userId: user._id.toString() });

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, fullname: user.fullname, email: user.email }
    });

  } catch (error) {
    console.error('Login error:', error);
    logToService('ERROR', 'Login error', { error: error.message });
    res.status(500).json({ error: 'Server error' });
  }
});

const httpsOptions = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
};

https.createServer(httpsOptions, app).listen(PORT, '0.0.0.0', () => {
  console.log(`EventLink API running on https://192.168.56.102:${PORT}`);
  console.log(`MongoDB: ${MONGO_URI}`);
  logToService('INFO', 'Backend API started', { port: PORT });
});
