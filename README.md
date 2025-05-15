# 🍽️ Bocados API

**Bocados API** is the backend service for the _Bocados_ application. It provides RESTful endpoints to manage a list of restaurants in **Barcelona**, allowing users to create, read, update, and delete restaurant entries.

Built with:

- ⚙️ [Express](https://expressjs.com/)
- 📘 [TypeScript](https://www.typescriptlang.org/)
- 🌍 [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- 🌐 CORS support
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

---

## 🧪 Testing

```bash
npm run test
```

This project uses:

- **Jest** for unit and integration tests
- **SuperTest** for HTTP request testing
- **MongoDB Memory Server** for in-memory database testing

Test coverage includes:

- Endpoint responses
- Validation and error handling
- MongoDB integration
- Edge cases

---

## 📡 API Endpoints

### 📍 Get paginated & alphabetically sorted restaurants

- **Request type:** `RestaurantRequest` (query: `RestaurantQuery`)
- **Response type:** `RestaurantsResponse` (body: `GetRestaurantsResBody`)

Returns a paginated list of restaurants (5 per page), sorted by name in ascending order. It also includes the total count of restaurants in the database.

- **Method:** `GET`
- **URL:** `/restaurants?page=<pageNumber>`
- **Query parameters:**
  - `page` (optional): Page number to retrieve (default is `1`)
- **Body:**
  {
  restaurants: RestaurantStructure[];
  restaurantsTotal: number;
  };
- **Sample response:**

```json
{
  "restaurants": [
    {
      "_id": "6639d96d8bcf3fce81b3882e",
      "name": "La Paradeta",
      "isVisited": false,
      "address": "Carrer Comercial, 7"
    },
    {
      "_id": "6639d96d8bcf3fce81b38830",
      "name": "Tickets",
      "isVisited": true,
      "address": "Av. del Paral·lel, 164"
    }
  ],
  "restaurantsTotal": 12
}
```

> ✔️ Response: `200 OK`  
> ❌ On server error: `500 Internal Server Error`

---

### 🔄 Toggle `isVisited` status of a restaurant

- **Request type:** `RestaurantRequest` (params: `restaurantId: string`)
- **Response type:** `ToggledRestaurantResponse` (body: `ToggleRestaurantResBody`)

Toggles the `isVisited` value (from `true` to `false` or vice versa) of a restaurant based on its ID.

- **Method:** `PATCH`
- **URL:** `/restaurants/visit-restaurant/:restaurantId`
- **Body:** {restaurant: RestaurantStructure}
- **Success response:**

```json
{
  "restaurant": {
    "_id": "681ba8bd4f458025d2570e39",
    "name": "La Paradeta",
    "isVisited": true
  }
}
```

- **Error responses:**
  - `404 Not Found` – If the restaurant does not exist
  - `400 Bad Request` – If the update operation fails

---

## 📝 License

MIT © Ivet López Prados
