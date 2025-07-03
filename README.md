# 🌍 Travel Destination Logger App
A full-stack Travel Destination Log Application built from scratch. This app includes a custom RESTful API server using Node.js and Express, connected to a MySQL database with image upload support, and a user-friendly frontend interface.

### 🧩 What I Built

- ✅ A **Node.js & Express** powered REST API with full **CRUD operations**
- ✅ **Image upload support** (multiple images per destination)
- ✅ Endpoints to **create, read, update, and delete** travel logs
- ✅ A professional **frontend UI** that:
  - Displays all destinations with travel date
  - Shows photos with left-right preview navigation
- ✅ Tested API endpoints manually using **cURL** for robust validation

## 🌐 Tech Stack

- **Backend:** Node.js, Express, MySQL (`mysql2/promise`)
- **Frontend:** HTML, CSS, JavaScript
- **Image Handling:** Multer
- **Testing:** Jest, Supertest, Keploy
- **CI/CD:** GitHub Actions
- **Docs:** Swagger UI

## 📦 Setup Instructions

### 🧰 Requirements

- Node.js (v16+)
- MySQL server
- Docker (optional)

### 🔧 Installation

```bash
git clone https://github.com/anuskagithub/TravelDestinationLog.git
cd TravelDestinationLog
npm install
```

## 🛠️ Database Setup

```
sql
CREATE DATABASE travel_db;

USE travel_db;

CREATE TABLE destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  location VARCHAR(255),
  description TEXT,
  date DATE,
  images TEXT
);
```
## 🚀 Application Running
🔌 Backend API Server
Runs on:
http://localhost:8080



Swagger Docs:
http://localhost:8080/api-docs

