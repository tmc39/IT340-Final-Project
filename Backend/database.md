# Database Configuration

## MongoDB Setup (VM3)
- Database: eventlink
- Port: 27017
- Accessible from: VM2 only (192.168.56.102)

## Collections

### Users Collection
- fullname: String (required)
- email: String (required, unique)
- password: String (required, hashed with bcrypt)
- createdAt: Date (default: current date)

## Connection String
mongodb://192.168.56.103:27017/eventlink
