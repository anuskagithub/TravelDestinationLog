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



## 🔄 CRUD API Operations


### 📥 Create a Destination
```
bash
curl -X POST http://localhost:8080/api/destinations \
  -F "name=Paris" \
  -F "location=France" \
  -F "description=City of Light" \
  -F "date=2025-07-01" \
  -F "images=@/path/to/photo1.jpg" \
  -F "images=@/path/to/photo2.jpg"

```

### 📤 Read Destinations
```
bash
# Get all
curl http://localhost:8080/api/destinations

# Get by ID
curl http://localhost:8080/api/destinations/43

```

### ✏️ Update Destination
```
bash
curl -X PUT http://localhost:8080/api/destinations/3 \
  -H "Content-Type: application/json" \
  -d '{
        "name": "London",
        "location": "UK",
        "description": "City of History",
        "date": "2025-08-15"
      }'
```

### ❌ Delete Destination(s)
```
bash
# Delete by ID
curl -X DELETE http://localhost:8080/api/destinations/42

# Delete all
curl -X DELETE http://localhost:8080/api/destinations
```



## ✅ Manual Testing Snapshots with cURL

### 🔹 Create Destination  
<img width="287" alt="Create Destination" src="https://github.com/user-attachments/assets/ea4f461b-de57-4ba0-a38d-4e43fdde7074" />

---

### 🔹 Get All Destinations  
<img width="726" alt="Get All Destinations" src="https://github.com/user-attachments/assets/732678e4-7e46-4078-a692-5bacfafbc189" />

---

### 🔹 Get Destination by ID  
<img width="722" alt="Get Destination by ID" src="https://github.com/user-attachments/assets/4a41a0cd-64a7-4191-997d-d0b30f310deb" />

---

### 🔹 Update Destination by ID  
<img width="500" alt="Update Destination by ID" src="https://github.com/user-attachments/assets/d4a229cf-456e-4c5b-9336-91b9d26c6329" />

---

### 🔹 Delete Destination by ID  
<img width="289" alt="Delete Destination by ID" src="https://github.com/user-attachments/assets/e86f5665-a678-43ff-bff0-4caf2eda1574" />




