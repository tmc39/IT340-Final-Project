const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const LOG_FILE = path.join(__dirname, 'eventlink.log');

app.use(bodyParser.json());

// Middleware to log all requests to this service
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// POST /log - Receive and store log messages
app.post('/log', (req, res) => {
  try {
    const { level, service, message, data } = req.body;
    const timestamp = new Date().toISOString();
    
    const logEntry = {
      timestamp,
      level: level || 'INFO',
      service: service || 'UNKNOWN',
      message,
      data: data || {}
    };

    // Write to log file
    const logLine = JSON.stringify(logEntry) + '\n';
    fs.appendFileSync(LOG_FILE, logLine);

    // Also log to console
    console.log(`[${logEntry.level}] [${logEntry.service}] ${logEntry.message}`);

    res.status(200).json({ success: true, message: 'Log recorded' });
  } catch (error) {
    console.error('Error logging message:', error);
    res.status(500).json({ success: false, error: 'Failed to log message' });
  }
});

// GET /logs - Retrieve recent logs
app.get('/logs', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    
    if (!fs.existsSync(LOG_FILE)) {
      return res.json({ logs: [] });
    }

    const logs = fs.readFileSync(LOG_FILE, 'utf-8')
      .trim()
      .split('\n')
      .filter(line => line)
      .map(line => JSON.parse(line))
      .slice(-limit)
      .reverse();

    res.json({ logs, count: logs.length });
  } catch (error) {
    console.error('Error reading logs:', error);
    res.status(500).json({ error: 'Failed to read logs' });
  }
});

// GET /logs/service/:serviceName - Get logs for specific service
app.get('/logs/service/:serviceName', (req, res) => {
  try {
    const { serviceName } = req.params;
    const limit = parseInt(req.query.limit) || 50;

    if (!fs.existsSync(LOG_FILE)) {
      return res.json({ logs: [] });
    }

    const logs = fs.readFileSync(LOG_FILE, 'utf-8')
      .trim()
      .split('\n')
      .filter(line => line)
      .map(line => JSON.parse(line))
      .filter(log => log.service === serviceName)
      .slice(-limit)
      .reverse();

    res.json({ logs, count: logs.length, service: serviceName });
  } catch (error) {
    console.error('Error reading logs:', error);
    res.status(500).json({ error: 'Failed to read logs' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Logging service is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`EventLink Logging Service running on http://192.168.56.104:${PORT}`);
  console.log(`Log file: ${LOG_FILE}`);
});

