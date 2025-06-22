# Travel Destination Log

A full-stack travel journal application to log and browse destinations with date and photo galleries. The app is built using **Node.js + Express** for the backend, **MySQL** for the database, and **HTML/CSS/JS** for the frontend.

## 📸 Features

- Add a destination with place name, date, and multiple photo uploads.
- Card-based UI to browse places.
- Each destination opens a full gallery page.
- Edit and delete destinations.
- RESTful backend APIs with file handling via Multer.

## 💡 Tech Stack

| Layer       | Tech                             |
|-------------|----------------------------------|
| Frontend    | HTML, CSS, JavaScript            |
| Backend     | Node.js, Express.js              |
| Database    | MySQL                            |
| Uploads     | Multer, Express static middleware|

## 🚀 Setup

### Clone and Install

```bash
git clone https://github.com/your-username/travel-destination-log.git
cd travel-destination-log
npm install

```
## 🔌RESTful API Documentation
### 1. POST /api/destinations
Add a new destination.
- Method: POST
- Content-Type: multipart/form-data

Body Params:                                                 
| Field        | Type   | Description                |
|--------------|--------|----------------------------|
| `place`      | text   | Name of destination        |
| `date_of_visit` | date   | Format `YYYY-MM-DD`         |
| `photos[]`   | files  | One or more image files    |


CURL Example:
```bash
curl -X POST http://localhost:3000/api/destinations \
  -F "place=Darjeeling" \
  -F "date_of_visit=2024-06-01" \
  -F "photos=@/absolute/path/to/photo1.jpg" \
  -F "photos=@/absolute/path/to/photo2.jpg"


```


### 2. GET /api/destinations
Fetch all destinations.
- Method: GET
- Response: JSON list of destinations

CURL Example:
```bash
curl http://localhost:3000/api/destinations

```

### 3. PUT /api/destinations/:id
Update destination name or date.
- Method: PUT
- Content-Type: application/json

```json
{
  "place": "Updated Name",
  "date_of_visit": "2024-06-10"
}

```

CURL Example:
```bash
curl -X PUT http://localhost:3000/api/destinations/1 \
  -H "Content-Type: application/json" \
  -d '{"place":"New Place","date_of_visit":"2024-06-10"}'

```

### 4. DELETE /api/destinations/:id
Delete a destination and its photos.
- Method: DELETE

CURL Example:
```bash
curl -X DELETE http://localhost:3000/api/destinations/1
```

📁 Folder Structure

travel-destination-log/
├── public/
│   └── uploads/         # Uploaded images
├── views/
│   ├── index.html       # Home page
│   └── gallery.html     # Gallery for each destination
├── server.js            # Express backend
├── package.json
└── README.md

🖼 UI Features
- 🎨 Clean dark-themed UI
- 📸 Photo gallery per destination
- ⬅️➡️ Navigate photos with arrows
- 🗑️ Delete destination and images

🧪 API Testing
Use Postman or curl to test the API.

📌 Test image upload:
```bash
curl -X POST http://localhost:3000/api/destinations \
  -F "place=Kolkata" \
  -F "date_of_visit=2024-04-01" \
  -F "photos=@/c/Users/yourname/Pictures/kolkata1.jpg"
```

## 📸 Screenshot
<img width="959" alt="image" src="https://github.com/user-attachments/assets/c059d320-87f0-425a-95f7-471193aa120d" />


## 🧪 Testing & Code Coverage

We have implemented a comprehensive test suite covering **unit**, **integration**, and **API** tests using **Jest** and **Supertest**. Here’s how to run them and view coverage:

```bash
npm test -- --detectOpenHandles
```

## 🔌 API Endpoints

| Endpoint                         | Method | Description                                |
|----------------------------------|--------|--------------------------------------------|
| `/api/destinations`             | GET    | Get all destinations (ordered by latest)   |
| `/api/destinations/:id`         | GET    | Get one destination (including images)     |
| `/api/destinations`             | POST   | Add new destination with optional photos    |
| `/api/destinations/:id`         | PUT    | Update `place` and `date_of_visit`         |
| `/api/destinations/:id`         | DELETE | Delete destination and associated images   |

---

## 🎯 Coverage Targets & Results
- Statements: >= 70%
- Branches: >= 70%
- Lines: >= 70%

## ✅ How We Achieved Coverage >70%
1. Unit Tests (__tests__/destinationService.test.js)
Mocked db and tested service functions to ensure 70–100% coverage on business logic.

2. Integration Tests (__tests__/destinationIntegration.test.js)
Tested all CRUD endpoints using a real MySQL database through mysql2/promise pool.

3. API Validation Tests (__tests__/destinationApiValidation.test.js, destinationAdditionalValidation.test.js)
Covered required fields validation, ID validation, error responses (400/404), and unsupported routes.

4. Photo Upload & Cleanup Tests (__tests__/destinationPhotoFlow.test.js)
Simulated file uploads with Multer and verified both photo retrieval and file deletion on DELETE.

## 🔧 Quick Test File Locations

```bash
__tests__/
├── destinationService.test.js              ← service unit tests
├── destinationIntegration.test.js          ← end-to-end CRUD tests
├── destinationApiValidation.test.js        ← invalid input/error tests
├── destinationAdditionalValidation.test.js ← extra field validation
└── destinationPhotoFlow.test.js            ← uploads & cleanup test
```

## 📸 Screenshot
<img width="569" alt="image" src="https://github.com/user-attachments/assets/e5233252-a2c8-4aa9-af18-ff0ab7f46961" />








