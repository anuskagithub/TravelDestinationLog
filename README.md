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
- The Express server runs on:  
  `http://localhost:3000`
  <img width="947" alt="image" src="https://github.com/user-attachments/assets/309381c8-bd72-4b71-a03e-b45afaf8c4a3" />


- Swagger API Docs:  
  `http://localhost:3000/api-docs`
  <img width="938" alt="image" src="https://github.com/user-attachments/assets/e849343e-7bf1-46cb-a2ea-bde210539b8d" />

## 🧾 API Endpoints

| Method | Endpoint             | Description                           |
|--------|----------------------|---------------------------------------|
| GET    | `/destinations`      | List all destinations                 |
| GET    | `/destinations/:id`  | Get a single destination by ID        |
| POST   | `/destinations`      | Add a new destination (with images)   |
| PUT    | `/destinations/:id`  | Update a destination                  |
| DELETE | `/destinations/:id`  | Delete destination by ID              |
| DELETE | `/destinations`      | Delete all destinations               |


