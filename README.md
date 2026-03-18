# PADO Full-Stack Challenge 🔒

## 📋 Description

Full-Stack challenge for PADO's Jr. Full-Stack Developer position (P&D). This project consists of two exercises: a backend API for registering IoT security devices and a frontend application for visualizing access logs from security devices.

## 🛠️ Tech Stack

|               | Backend              | Frontend        |
| ------------- | -------------------- | --------------- |
| **Language**  | JavaScript (Node.js) | TypeScript      |
| **Framework** | Express.js           | React 18 + Vite |
| **Database**  | MongoDB + Mongoose   | -               |
| **Styling**   | -                    | Tailwind CSS v3 |
| **Container** | Docker               | Docker + Nginx  |

## 📁 Exercises

### 🔧 Backend — IoT Device Registration API

REST API for registering and listing IoT security devices.

- **Routes:** `POST /registrar`, `GET /listar`, `GET /listar/:deviceId`
- **Architecture:** MVC with ES Modules

👉 [Backend README](./server/README.md)

### 🖥️ Frontend — Access Logs Viewer

React application for visualizing security access logs.

- **Features:** View toggle, filtering, sorting, pagination
- **Data:** Fetched from local `data.json` simulating an API

👉 [Frontend README](./client/README.md)

## 🚀 Quick Start

### Backend:

```bash
cd server
npm install
npm run dev
```

### Frontend:

```bash
cd client
npm install
npm run dev
```

## 👤 Author

Developed by **Julio Gonçalves** as part of the PADO Full-Stack Jr. interview challenge.

🍀 Boa sorte! 🍀
