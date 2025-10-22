# CRUD api

A simple RESTful CRUD API built with Node.js, Express, and MongoDB (Mongoose). This mini project was created while learning the basics of building APIs with the MERN backend stack.

- Base URL (dev): `http://localhost:3000`
- Products route prefix: `/api/products`

## Tech stack

- Node.js + Express
- MongoDB + Mongoose
- dotenv for environment variables
- nodemon for development

## Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file at the project root using `sample.env` as a reference and set your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://<username>:<db_password>@<cluster>/<db_name>
```

> Note: The server listens on port `3000` by default (see `index.js`).

### 3) Run the server (development)

```bash
npm run dev
```

If the connection is successful, you should see logs like:

```
Connected to MongoDB
server is running at http://localhost:3000
```

## Endpoints

### Health/Root

- GET `/` – Returns a welcome message and the list of available endpoints.

### Products

Base path: `/api/products`

- GET `/api/products` – Get all products
- GET `/api/products/:id` – Get a product by id
- POST `/api/products` – Create a new product
- PUT `/api/products/:id` – Update a product by id (partial or full)
- DELETE `/api/products/:id` – Delete a product by id

### Request body (Product)

The product model (`models/products.model.js`) has these fields:

```json
{
  "name": "Apple iPhone 15",
  "quantity": 10,
  "price": 999,
  "image": "https://example.com/pizza.jpg"
}
```

- `name` (string, required)
- `quantity` (number, required, default 0)
- `price` (number, required, default 0)
- `image` (string, optional)

## Quick examples

Create a product:

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Product",
    "quantity": 5,
    "price": 199.99,
    "image": "https://example.com/sample.jpg"
  }'
```

Get all products:

```bash
curl http://localhost:3000/api/products
```

Get one product by id:

```bash
curl http://localhost:3000/api/products/<mongo_object_id>
```

Update a product:

```bash
curl -X PUT http://localhost:3000/api/products/<mongo_object_id> \
  -H "Content-Type: application/json" \
  -d '{ "price": 149.99 }'
```

Delete a product:

```bash
curl -X DELETE http://localhost:3000/api/products/<mongo_object_id>
```

## Folder structure

```
crud_api/
├─ index.js               # App entry, routes mount, Mongo connection
├─ package.json           # Scripts and dependencies
├─ sample.env             # Example env variables
├─ Routes/
│  └─ products.route.js   # Express router for product endpoints
├─ controllers/
│  └─ product.controller.js # CRUD controller logic
└─ models/
   └─ products.model.js   # Mongoose schema/model
```

## Notes & troubleshooting

- Invalid ObjectId will return `400 Bad Request` with message `Invalid product id format`.
- Non‑existent ids return `404 Not Found`.
- Ensure your `MONGODB_URI` is correct and your IP is allowed (if using Atlas).

## Author

- LinkedIn: https://www.linkedin.com/in/ashish-saud-55ab57294/
- Twitter (X): https://x.com/ashish_saud15

## License

This project is licensed under the ISC License (see `package.json`).
