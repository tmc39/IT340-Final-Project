# EventLink - Campus Event Management System

A full-stack web application for managing campus events with RSVP functionality, comments, watchlists, and email notifications.

## 🏗️ System Architecture

EventLink is deployed across 4 Virtual Machines using a microservices architecture:

- **VM1 (192.168.56.101)**: Angular Frontend (HTTPS on port 4200)
- **VM2 (192.168.56.102)**: Express.js Backend API (HTTPS on port 3000)
- **VM3 (192.168.56.103)**: MongoDB Database (port 27017)
- **VM4 (192.168.56.104)**: Logging Service (port 5000) + Email Service (port 5001)

All VMs are connected via VLAN (VMnet2) with proper firewall rules.

---

## ✨ Features

### Authentication & Security
- ✅ User registration with email validation
- ✅ Password hashing using bcrypt
- ✅ Two-Factor Authentication (2FA) via email
- ✅ JWT-based session management
- ✅ HTTPS/TLS encryption
- ✅ Protected routes with auth guards

### Event Management
- ✅ Create events with title, description, date, time, location, and category
- ✅ View all campus events
- ✅ Search events by title, description, location, or category
- ✅ Filter events by category (Academic, Sports, Social, Networking, Community)
- ✅ RSVP to events
- ✅ Cancel RSVP
- ✅ Real-time attendee count

### Social Features
- ✅ Comment on events
- ✅ Add events to personal watchlist
- ✅ View event details in modal

### Dashboard
- ✅ Quick stats (Events RSVP'd, Watchlisted, Total, Available)
- ✅ My RSVPs section
- ✅ Watchlist management
- ✅ Event discovery feed

### Email Notifications
- ✅ 2FA login codes
- ✅ RSVP confirmation emails
- ✅ RSVP cancellation emails

### Logging
- ✅ Centralized logging service on VM4
- ✅ Logs saved to daily files
- ✅ API to view logs via HTTP

---

## 🛠️ Technology Stack

### Frontend (VM1)
- **Framework**: Angular 18
- **Language**: TypeScript
- **Styling**: Custom CSS
- **HTTP Client**: Angular HttpClient
- **Security**: SSL/TLS certificates

### Backend (VM2)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (jsonwebtoken), bcrypt
- **Security**: CORS, HTTPS

### Database (VM3)
- **Database**: MongoDB 8.0
- **ODM**: Mongoose
- **Collections**: Users, Events, Comments, WatchList, TwoFactorCodes

### Services (VM4)
- **Logging**: Express.js service writing to files
- **Email**: Nodemailer with Ethereal Email (testing)
- **Format**: JSON logs with timestamps

---

## 📋 Prerequisites

- **VMware Workstation** or VirtualBox
- **Ubuntu 24.04 LTS** (4 VMs)
- **Node.js 20+** (VM1, VM2, VM4)
- **MongoDB 8.0** (VM3)
- **Angular CLI 18** (VM1)
- **Network**: VLAN configured (VMnet2 - 192.168.56.0/24)

---

## 🚀 Installation & Setup

### VM1 - Angular Frontend
```bash
# Install Node.js and Angular CLI
sudo apt update
sudo apt install -y nodejs npm
sudo npm install -g @angular/cli@18

# Clone project
cd ~
git clone <your-repo-url> mean-stack-frontend
cd mean-stack-frontend

# Install dependencies
npm install

# Generate SSL certificates
mkdir ssl
cd ssl
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Configure firewall
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 4200
sudo ufw enable

# Start Angular dev server
ng serve --ssl --ssl-key ssl/key.pem --ssl-cert ssl/cert.pem --host 0.0.0.0
```

**Access:** `https://192.168.56.101:4200`

---

### VM2 - Express.js Backend
```bash
# Install Node.js
sudo apt update
sudo apt install -y nodejs npm

# Clone backend
cd ~
git clone <your-repo-url> eventlink-backend
cd eventlink-backend

# Install dependencies
npm install express mongoose bcrypt jsonwebtoken cors axios

# Generate SSL certificates
mkdir ssl
cd ssl
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
cd ..

# Configure firewall (allow from VLAN only)
sudo ufw allow from 192.168.56.0/24 to any port 3000
sudo ufw allow 22
sudo ufw enable

# Start backend server
node server.js
```

**API Endpoint:** `https://192.168.56.102:3000`

---

### VM3 - MongoDB Database
```bash
# Import MongoDB GPG key
sudo apt-get install gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Configure MongoDB to listen on VLAN IP
sudo nano /etc/mongod.conf
# Change: bindIp: 192.168.56.103

# Configure firewall
sudo ufw allow from 192.168.56.102 to any port 27017
sudo ufw allow 22
sudo ufw enable

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongosh --host 192.168.56.103 --port 27017
```

**Database:** `mongodb://192.168.56.103:27017/eventlink`

---

### VM4 - Logging & Email Services
```bash
# Install Node.js
sudo apt update
sudo apt install -y nodejs npm

# Clone services
cd ~
mkdir eventlink-logging
cd eventlink-logging

# Install dependencies
npm install express body-parser nodemailer

# Create logger.js and email-service.js (see repo)

# Configure firewall
sudo ufw allow from 192.168.56.102 to any port 5000
sudo ufw allow from 192.168.56.102 to any port 5001
sudo ufw allow 22
sudo ufw enable

# Start logging service
node logger.js

# Start email service (separate terminal)
node email-service.js
```

**Logging Service:** `http://192.168.56.104:5000`  
**Email Service:** `http://192.168.56.104:5001`

---

## 🔐 Network Configuration

### VLAN Setup (VMnet2)
- **Network**: 192.168.56.0/24
- **Subnet Mask**: 255.255.255.0
- **Gateway**: 192.168.56.2

### Firewall Rules

**VM1 (Frontend):**
```bash
sudo ufw allow 22        # SSH
sudo ufw allow 80        # HTTP
sudo ufw allow 443       # HTTPS
sudo ufw allow 4200      # Angular dev server
sudo ufw enable
```

**VM2 (Backend):**
```bash
sudo ufw allow 22
sudo ufw allow from 192.168.56.0/24 to any port 3000
sudo ufw enable
```

**VM3 (Database):**
```bash
sudo ufw allow 22
sudo ufw allow from 192.168.56.102 to any port 27017
sudo ufw enable
```

**VM4 (Services):**
```bash
sudo ufw allow 22
sudo ufw allow from 192.168.56.102 to any port 5000
sudo ufw allow from 192.168.56.102 to any port 5001
sudo ufw enable
```

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login (sends 2FA code)
- `POST /api/auth/verify-2fa` - Verify 2FA code and get JWT

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event with comments
- `POST /api/events` - Create new event
- `GET /api/events/search/:query` - Search events

### RSVP
- `POST /api/events/:id/rsvp` - RSVP to event
- `DELETE /api/events/:id/rsvp` - Cancel RSVP

### Comments
- `POST /api/events/:id/comments` - Add comment to event

### Watchlist
- `POST /api/watchlist` - Add event to watchlist
- `GET /api/watchlist/:userId` - Get user's watchlist
- `DELETE /api/watchlist` - Remove from watchlist

### Logging
- `POST /log` - Send log entry
- `GET /logs` - Get recent logs
- `GET /logs/service/:serviceName` - Get logs for specific service

---

## 👥 User Guide

### Registration
1. Navigate to `https://192.168.56.101:4200`
2. Click "Register"
3. Fill in: Full Name, Email (must be valid format), Password (min 6 chars, 1 uppercase, 1 number)
4. Click "Register"

### Login (with 2FA)
1. Enter email and password
2. Click "Sign In"
3. Check email for 6-digit code (or check Ethereal email inbox)
4. Enter 6-digit code
5. Click "Verify & Login"

### Create Event
1. Click "Create Event" in navigation
2. Fill in event details:
   - Title
   - Description
   - Date
   - Time
   - Location
   - Category
3. Click "Create Event"

### RSVP to Event
1. Browse events on Events page
2. Click on an event card
3. Click "RSVP to Event" in modal
4. Check email for confirmation

### Manage Watchlist
1. Click on event
2. Click "Add to Watch List"
3. View watchlist on Dashboard

### View Dashboard
1. Click "Dashboard" in navigation
2. See your RSVPs, watchlist, and stats

---

## 📊 Database Schema

### Users Collection
```javascript
{
  fullname: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Events Collection
```javascript
{
  title: String,
  description: String,
  date: String,
  time: String,
  location: String,
  category: String,
  creator: ObjectId (ref: User),
  creatorName: String,
  attendees: [ObjectId],
  createdAt: Date
}
```

### Comments Collection
```javascript
{
  eventId: ObjectId (ref: Event),
  userId: ObjectId (ref: User),
  userName: String,
  text: String,
  likes: Number,
  dislikes: Number,
  createdAt: Date
}
```

### WatchList Collection
```javascript
{
  userId: ObjectId (ref: User),
  eventId: ObjectId (ref: Event),
  addedAt: Date
}
```

### TwoFactorCodes Collection
```javascript
{
  userId: ObjectId (ref: User),
  code: String,
  expiresAt: Date,
  verified: Boolean,
  createdAt: Date
}
```

---

## 🐛 Troubleshooting

### Frontend not loading
```bash
# Check if Angular is running
ps aux | grep ng

# Check firewall
sudo ufw status

# Restart Angular
cd ~/mean-stack-frontend
ng serve --ssl --ssl-key ssl/key.pem --ssl-cert ssl/cert.pem --host 0.0.0.0
```

### Backend connection refused
```bash
# Check if server is running
ps aux | grep node

# Check MongoDB connection
mongosh --host 192.168.56.103 --port 27017

# Restart backend
cd ~/eventlink-backend
node server.js
```

### MongoDB not connecting
```bash
# Check MongoDB status
sudo systemctl status mongod

# Check bind IP
sudo cat /etc/mongod.conf | grep bindIp

# Restart MongoDB
sudo systemctl restart mongod
```

### Email not sending
```bash
# Check email service
ps aux | grep email-service

# Restart email service
cd ~/eventlink-logging
node email-service.js
```

### Logs not recording
```bash
# Check logging service
ps aux | grep logger

# View logs
cat ~/eventlink-logging/eventlink.log

# Restart logger
cd ~/eventlink-logging
node logger.js
```

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT tokens with 24-hour expiration
- ✅ Two-Factor Authentication via email
- ✅ HTTPS/TLS encryption on all HTTP traffic
- ✅ CORS configured for specific origins
- ✅ Firewall rules limiting access to internal services
- ✅ Input validation on registration (email format, password strength)
- ✅ Protected API routes requiring authentication

---

## 👨‍💻 Development Team

[Preet Patel, Timothy Conway]  
[IT340-005]  
[Fall 2025]

---

## 🙏 Acknowledgments

- Angular Team for the frontend framework
- Express.js for the backend framework
- MongoDB for the database
- Nodemailer & Ethereal Email for email testing
- Course instructor for guidance

---

**Last Updated:** December 2025

