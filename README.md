# ☁️ LearnCloud - Cloud Education Platform

A scalable, containerized microservices-based education platform designed with a strong backend foundation. Built using Express.js and FastAPI, with full CI/CD automation, unit testing, and Docker-based deployment.

---

## 🚀 Features

1. Self-paced learning modules.    
2. Secure user authentication and authorization.  
3. Progress tracking and certification.  
4. Theme access to over 32 different themes. 

---

## 🛠️ Tech Stack

| Area           | Tech Used                                |
|----------------|-------------------------------------------|
| Backend        | Node.js (Express), Python (FastAPI)       |
| Database/Auth  | Supabase (PostgreSQL + Auth)              |
| DevOps         | Docker, Docker Compose, GitHub Actions    |
| Testing        | Jest (Node.js), Pytest (FastAPI)          |
| Deployment     | Railway.app                               |
| Frontend       | React, Tailwind CSS                       |

---

## 🧱 Microservice Architecture

- **`auth-service/`** – JWT-based authentication (Express.js)
- **`course-service/`** – Course CRUD APIs (Express.js)
- **`progress-service/`** – Tracks user learning progress (Express.js)
- **`analytics-service`** - Shows analytics of courses (FastAPI)
- **`nginx/`** – Nginx reverse proxy to route requests
- **`frontend/`** – React-based frontend interface

---

## 🐳 Docker & Containerization

Each service is containerized with its own `Dockerfile` and orchestrated using `docker-compose`.

---

Screenshots

---

