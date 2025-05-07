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

## 📃 License

MIT © Ivet López Prados.
