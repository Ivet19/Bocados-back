# 🍽️ Bocados API

**Bocados API** is the backend service for the _Bocados_ application. It provides RESTful endpoints to manage a list of restaurants in **Barcelona**, allowing users to create, read, update, and delete restaurant entries.

Built with:

- ⚙️ [Express](https://expressjs.com/)
- 📘 [TypeScript](https://www.typescriptlang.org/)
- 🌍 [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- 🌐 [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) support
- 🧪 [Jest](https://jestjs.io/), [SuperTest](https://github.com/ladjs/supertest), [MongoDB Memory Server](https://github.com/nodkz/mongodb-memory-server)

---

## 📦 Installation & Setup

```bash
git clone https://github.com/Ivet19/Bocados-back.git
cd Bocados-back
npm install
```

### 🚀 Start the server

```bash
npm run dev
```

### 🧪 Run tests

```bash
npm run test
```

---

## 📚 API Endpoints

All endpoints are prefixed with `/restaurants`.

### ➕ Create a restaurant

- **Method**: `POST`
- **URL**: `/restaurants`
- **Body**:

```json
{
  "name": "Can Culleretes",
  "location": "Carrer d'en Quintana, 5",
  "foodType": "Catalan",
  "description": "One of the oldest restaurants in Barcelona",
  "image": "https://example.com/image.jpg",
  "visited": true,
  "rating": 9,
  "visitDate": "2023-08-12"
}
```

- **Response**: `201 Created`

```json
{
  "_id": "60f...",
  "name": "Can Culleretes",
  ...
}
```

---

### 📖 Get all restaurants

- **Method**: `GET`
- **URL**: `/restaurants`
- **Response**: `200 OK`

```json
[
  {
    "_id": "60f...",
    "name": "Can Culleretes",
    ...
  },
  ...
]
```

---

### 📄 Get restaurant by ID

- **Method**: `GET`
- **URL**: `/restaurants/:id`
- **Response**: `200 OK`

```json
{
  "_id": "60f...",
  "name": "Can Culleretes",
  ...
}
```

- **Error**: `404 Not Found` if ID does not exist

---

### 📝 Update a restaurant

- **Method**: `PUT`
- **URL**: `/restaurants/:id`
- **Body**: (partial or full)

```json
{
  "name": "Updated Name",
  "rating": 8
}
```

- **Response**: `200 OK`

```json
{
  "_id": "60f...",
  "name": "Updated Name",
  ...
}
```

---

### ❌ Delete a restaurant

- **Method**: `DELETE`
- **URL**: `/restaurants/:id`
- **Response**:

```json
{
  "_id": "60f...",
  "name": "Can Culleretes",
  ...
}
```

- **Error**: `404 Not Found` if ID does not exist

---

## 🧪 Testing

The backend uses:

- **Jest** for running unit and integration tests
- **SuperTest** for HTTP assertions
- **MongoDB Memory Server** for isolated, in-memory DB testing

Run tests with:

```bash
npm run test
```

Tests cover:

- Endpoint responses
- Validation errors
- MongoDB integration
- Edge cases

---

## 📃 License

MIT © [Your Name or Organization]
