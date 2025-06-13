# ☁️ LearnCloud - Cloud Education Platform

A scalable, containerized microservices-based education platform designed with a strong backend foundation. Built using Express.js and FastAPI, with full CI/CD automation, unit testing, and Docker-based deployment.

---

## 🚀 Features

1. Self-paced learning modules.    
2. Secure user authentication and authorization with Supabase and JWT.  
3. Progress tracking stored in PostgreSQL, updated via REST API, displayed as progress bars in React frontend.
4. Unit tests (Pytest for Python Flask backend, Jest for Express backend and React frontend).
5. auth-service, course-service, progress-service and analytics-service containerized with Docker, orchestrated with docker-compose (dev)
6. Automated deployment to Docker via Github-Actions for CI/CD.
7. Theme access to over 32 different themes using DaisyUI. 

---

## 🛠️ Tech Stack

| Area           | Tech Used                                |
|----------------|-------------------------------------------|
| Backend        | Node.js (Express), Python (FastAPI)       |
| Database/Auth  | Supabase (PostgreSQL + Auth)              |
| DevOps         | Docker, Docker Compose, GitHub Actions    |
| Testing        | Jest (Node.js), Pytest (FastAPI)          |
| Deployment     | Railway.app                               |
| Frontend       | React, Tailwind CSS, DaisyUI                       |

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

![register](https://github.com/user-attachments/assets/876f6d31-d3bd-455e-9e53-8a0ed11b0dfe)
![login](https://github.com/user-attachments/assets/92be442b-6e50-4046-a602-07c8ed38d9ff)
![home](https://github.com/user-attachments/assets/0921ad05-ebfc-4226-8f7d-9b05e1b07e1f)
![modules](https://github.com/user-attachments/assets/c1d9c7c1-3a1b-4d45-a80b-5e041b3bf962)
![course](https://github.com/user-attachments/assets/9f1175ce-a3e5-4712-8578-e5b2ac8d2c84)
![microservices](https://github.com/user-attachments/assets/5f8e6a2a-1de0-46ac-8341-a1db491718bb)




