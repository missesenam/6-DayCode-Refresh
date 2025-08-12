# 💡 Ideas API

A simple RESTful API built with **Node.js**, **Express**, and **MongoDB** to manage ideas. Users can create, view, update, delete, and filter ideas by tag.

---

## 🚀 Features

- Create new ideas 💭
- Retrieve all ideas 🧠
- Filter ideas by tag 🏷️
- Update existing ideas ✏️
- Delete ideas 🗑️
- MongoDB integration with Mongoose 🌿

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB** + **Mongoose**
- **dotenv**
- **bcryptjs** + **jsonwebtoken** (auth-ready)
- **express-validator**
- **CORS**

---

## 📦 Installation

1. Clone the repo:

```bash
git clone https://github.com/GraceDjobokou/ideas-api.git
cd ideas-api
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

---

## ▶️ Running the App

```bash
yarn start
```

OR if you're using nodemon for development:

```bash
yarn dev
```

---

## 📌 API Endpoints

| Method | Route                 | Description       |
| ------ | --------------------- | ----------------- |
| POST   | `/api/ideas`          | Create a new idea |
| GET    | `/api/ideas`          | Get all ideas     |
| GET    | `/api/ideas/tag/:tag` | Get ideas by tag  |
| PUT    | `/api/ideas/:id`      | Update an idea    |
| DELETE | `/api/ideas/:id`      | Delete an idea    |

---

## 🧪 Example Request (JSON)

```json
{
  "title": "Learn Node.js",
  "description": "Practice building REST APIs",
  "tag": "coding"
}
```

---

## 🧑‍💻 Author

**Grace Esime Djobokou**  
🔗 [GitHub Profile](https://github.com/GraceDjobokou)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
