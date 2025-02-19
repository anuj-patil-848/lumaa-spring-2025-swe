# Task Management App

A full-stack **task management application** built with **React (frontend)** and **Node.js with Express (backend)** using **PostgreSQL** as the database.

---

## 🚀 Features

- ✅ **User Authentication** (JWT-based login/register)
- ✅ **Create, Read, Update, Delete (CRUD) Tasks**
- ✅ **Secure Routes** (Only authenticated users can manage tasks)
- ✅ **Persistent Storage** with PostgreSQL Database

---

## Tech Stack

| Technology       | Usage                 |
|-----------------|----------------------|
| **React + TypeScript** | Frontend UI |
| **Node.js + Express**  | Backend API |
| **PostgreSQL**        | Database |
| **JWT (JSON Web Tokens)** | Authentication |
| **Sequelize ORM**      | Database Modeling |
| **Docker (optional)**  | Containerization |

---

## 🛠 Steps to Set Up the Database

1. **Install PostgreSQL** (if not installed)
2. Create a new database:
   ```sh
   createdb tasksDB
3. Run database migration:
   ```sh
   npx sequelize-cli db:migrate
4. Setup environment variables:
   Create a .env file in the backend folder.
   ```ini
   DATABASE_URL=postgres://username:password@localhost:5432/tasksDB
   JWT_SECRET=your_secret_key

---

## How to Run the Backend

1. Navigate to the backend folder:
   ```sh
   cd backend
2. Install dependencies:
   ```sh
   npm install
3. Start the backend server:
   ```sh
   npm start
4. The server runs on http://localhost:3000

---

## How to Run the Frontend

1. Navigate to the frontend folder:
   ```sh
   cd frontend
2. Install dependencies:
   ```sh
   npm install
3. Start the backend server:
   ```sh
   npm start
4. The app runs on http://localhost:3001

---

## Testing Notes
- API Testing: Use Postman or cURL to test routes.
- Unit Tests: Run backend tests using:
  ```sh
  npm test
- Frontend Testing: Use React Testing Library.

---

## Salary Expectations
Around $3500 - $4000

---

## License
This pproject is licensed under the MIT license.

---

## Contact
For any queries, reach out to anujpatil848@gmail.com
