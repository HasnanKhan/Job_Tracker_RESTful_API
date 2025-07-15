# 📌 Job Tracker API

A simple RESTful API using Node.js, Express, and MongoDB to track job applications with user authentication.

---

## 🚀 Features

- User registration & login (JWT)
- Protected CRUD routes for job applications
- MongoDB for persistent storage
## 🛠️ Setup Instructions

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/HasnanKhan/RESTful_API_NodeJS.git
cd RESTful_API_NodeJS
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create `.env` File
Create a `.env` file in the root directory:
```env
PORT=5050
MONGO_URI=mongodb://localhost:27017/jobtracker
JWT_SECRET=your_jwt_secret_here
```

### 4. Start MongoDB
```bash
mkdir -p ~/mongodb-data
mongod --dbpath ~/mongodb-data
```

### 5. Run the Server
```bash
node server.js
```
Expected Output:
```
✅ MongoDB Connected
🚀 Server running on port 5050
```

---

## 🧪 API Testing Guide

### ✅ Health Check
```bash
curl http://localhost:5050/test
```
Expected:
```
API is working ✅
```

### 👤 Register a User
```bash
curl -X POST http://localhost:5050/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"user1", "password":"pass123"}'
```
Expected:
```json
{"msg":"User registered successfully"}
```

### 🔐 Login
```bash
curl -X POST http://localhost:5050/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user1", "password":"pass123"}'
```
Expected:
```json
{"token":"<your-jwt-token>"}
```

### 📬 Create Job Application
Replace `<your-jwt-token>`:
```bash
curl -X POST http://localhost:5050/applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "company": "OpenAI",
    "position": "ML Engineer",
    "status": "applied"
  }'
```
Expected:
```json
{"msg":"Application created successfully"}
```

### 📄 Get All Applications
```bash
curl -X GET http://localhost:5050/applications \
  -H "Authorization: Bearer <your-jwt-token>"
```

### 🗑️ Delete an Application
Replace `<application-id>`:
```bash
curl -X DELETE http://localhost:5050/applications/<application-id> \
  -H "Authorization: Bearer <your-jwt-token>"
```
Expected:
```json
{"msg":"Application deleted"}
```
