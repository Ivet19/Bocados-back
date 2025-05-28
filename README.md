# 🍽️ Bocados API

**Bocados API** is the backend service for the _Bocados_ application. It provides RESTful endpoints to manage a list of restaurants in **Barcelona**, allowing users to create, read, update, and delete restaurant entries.

## 🛠️ Built with

- ⚙️ [Express](https://expressjs.com/)
- 📘 [TypeScript](https://www.typescriptlang.org/)
- 🌍 [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- 🌐 CORS support
- 🧪 [Jest](https://jestjs.io/), [SuperTest](https://github.com/ladjs/supertest), [MongoDB Memory Server](https://github.com/nodkz/mongodb-memory-server)
- ✅ ESLint, Prettier, Husky, Lint-Staged, Commitlint
- 🔒 GitHub Actions (CI), SonarCloud, .editorconfig

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

Create a `.env` file based on `.env.sample` with the necessary MongoDB config.

---

## 🚨 Git Hooks & Quality Tools

This project uses:

- **Husky** for pre-commit hooks
- **Lint-staged** to run ESLint and prettier on staged files
- **Commitlint** for commit message formatting
- **GitHub Actions** for CI:
  - `audit.yml`: dependency vulnerabilities
  - `testing.yml`: run Jest tests
  - `sonar.yml`: SonarCloud analysis

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

### 📄 Get a restaurant by ID

- **Request type:** `RestaurantRequest` (params: `restaurantId: string`)
- **Response type:** `RestaurantsResponse` (body: `GetRestaurantsResBody`)
- **Method:** `GET`
- **URL:** `/restaurants/:restaurantId`
- **Params:**
  - `restaurantId`

> ✅ `200 OK`  
> ❌ `404 Not Found`

---

### ➕ Add a new restaurant

- **Request type:** `RestaurantRequest`
- **Response type:** `RestaurantsResponse` (body: `GetRestaurantsResBody`)
- **Method:** `POST`
- **URL:** `/restaurants`
- **Request body:**
  {
  "name": string;
  "adress": string;
  "foodType": string;
  "imageUrl": string;
  "description": string;
  "isVisited": boolean;
  "visitDate"?: string;
  "servingsAmount"?: ServingsAmmount;
  "waitTime"?: WaitTime;
  "customerService"?: CustomerService;
  "priceCategory"?: PriceCategory;
  "rating"?: number;
  };
- **Sample response:**

```json
{
  "_id": "681ba8bd4f458025d2570e56",
  "name": "Lluis i tu",
  "adress": "C/de la Palla, 26",
  "foodType": "Tapas y platillos",
  "imageUrl": "https://example.com/image.jpg",
  "description": "Un lugar cálido y tranquilo...",
  "isVisited": true,
  "rating": 4,
  "visitDate": "2024-12-03T00:00:00.000Z"
}
```

> ✅ `201 Created`  
> ❌ `400 Bad Request`

---

### 🗑️ Delete a restaurant

- **Request type:** `RestaurantRequest` (params: `restaurantId: string`)
- **Response type:** `RestaurantsResponse` (body: `GetRestaurantsResBody`)
- **Method:** `DELETE`
- **URL:** `/restaurants/:restaurantId`

> ✅ `200 OK`  
> ❌ `404 Not Found`

---

### 🔄 Toggle `isVisited` status of a restaurant

- **Request type:** `RestaurantRequest` (params: `restaurantId: string`)
- **Response type:** `ToggledRestaurantResponse` (body: `RestaurantResBody`)

Toggles the `isVisited` value (from `true` to `false` or vice versa) of a restaurant based on its ID.

- **Method:** `PATCH`
- **URL:** `/restaurants/visit-restaurant/:restaurantId`
- **Body:** {restaurant: RestaurantStructure}
- **Success response:**

  - ✅ `200 OK`

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
  - ❌ `404 Not Found` – If the restaurant does not exist
  - ❌ `400 Bad Request` – If the update operation fails

---

### ✏️ Modify an existing restaurant

- **Request type:** `ModifiedRestaurantRequest` (params: `restaurantId: string`)
- **Response type:** `RestaurantsResponse` (body: `GetRestaurantsResBody`)

Replaces the restaurant for the modified restaurant with the same id and returns the whole updated restaurant.

- **Method:** `PUT`
- **URL:** `/restaurants/modify-restaurant/:restaurantId`
- **Body:** {restaurant: RestaurantStructure}
- **Sample response:**

```json
{
  "restaurant": {
    "id": "abc123",
    "name": "Candela en Rama",
    "adress": "C/Blai 8, Poble-sec",
    "foodType": "Andaluza",
    "imageUrl": "https://example.com/candela.jpg",
    "description": "Restaurante andaluz informal...",
    "isVisited": true,
    "servingsAmount": "Generosa",
    "waitTime": "Normal",
    "customerService": "Bueno",
    "priceCategory": "Medio",
    "rating": 4.2,
    "visitDate": "2024-10-02"
  }
}
```

> ✅ `200 OK`  
> ❌ `404 Not Found` | `400 Bad Request`

---

## 🧭 Project Structure

```
Bocados-back/
├── .github/
│   └── workflows/           # CI/CD pipelines (audit, sonar, testing)
├── .husky/                  # Git hooks (pre-commit, commit-msg, pre-push)
├── src/
│   ├── database/            # MongoDB connection setup
│   ├── globals/             # Shared constants and utility types
│   ├── restaurant/          # Restaurant domain
│   │   ├── controller/      # Route logic / handlers
│   │   │   └── __tests__/   # Controller unit tests
│   │   ├── model/           # Mongoose model
│   │   ├── router/          # Express route definitions
│   │   │   └── __tests__/   # Integration tests for routes
│   │   ├── types.ts         # Domain-specific types
│   │   └── fixtures.ts      # Sample/mock data
│   ├── server/
│   │   ├── middlewares/     # Custom Express middlewares
│   │   │   ├── handleCorsAllowedOrigins/
│   │   │   ├── handleEndpointNotFound/
│   │   │   ├── handleErrors/
│   │   │   ├── handleHealthCheckStatus/
│   │   │   └── handleIdValidation/
│   │   ├── __tests__/       # Middleware and server-level tests
│   │   ├── app.ts           # Express app setup
│   │   ├── startServer.ts   # Server startup logic
│   │   └── ServerError/     # Custom error class
│   ├── index.ts             # Main entry point
│   └── env.d.ts             # Type definitions for environment variables
├── .editorconfig
├── .env.sample              # Sample environment config
├── .gitignore
├── .lintstagedrc.json
├── Bocados-endpoints-collection.postman_collection.json
├── README.md
├── commitlint.config.ts
├── eslint.config.js
├── jest.config.ts
├── package.json
├── package-lock.json
├── sonar-project.properties
└── tsconfig.json
```

---

## 📝 License

MIT © Ivet López Prados
