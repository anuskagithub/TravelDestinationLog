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





