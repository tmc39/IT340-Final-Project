# Security Configuration

## Firewall Rules

### VM1 (Frontend - Public)
- Port 22: SSH
- Port 80: HTTP
- Port 443: HTTPS
- Port 4200: Angular dev server

### VM2 (Backend - Private)
- Port 22: SSH
- Port 3000: Express API (VLAN only - 192.168.56.0/24)

### VM3 (Database - Private)
- Port 22: SSH
- Port 27017: MongoDB (VM2 only - 192.168.56.102)

### VM4 (Auth/Monitoring - Private)
- Port 22: SSH
- Port 5000: Auth service (VM2 only - 192.168.56.102)

## Security Features
- Password hashing with bcrypt (10 salt rounds)
- JWT token authentication
- CORS enabled for frontend-backend communication
- Private VMs isolated from public internet
