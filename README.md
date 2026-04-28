# Bejeweled

A full-stack implementation of the Bejeweled match-3 puzzle game. Developed iteratively — from a console prototype to a Spring Boot REST API backend with a React frontend, user authentication via Firebase, and a PostgreSQL database for scores, comments, and ratings.

## Features

- Match-3 game logic with horizontal/vertical matching, tile dropping, chain reactions, and shuffle
- User registration and sign-in via email/password or Google (Firebase Authentication)
- Protected routes — game accessible only to authenticated users
- Score tracking with TOP 10 leaderboard
- User comments and star ratings
- REST API consumed by the React frontend

## Tech stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Backend    | Java 23, Spring Boot 3.4, Maven                 |
| Database   | PostgreSQL (JPA + Hibernate)                    |
| Frontend   | React, Vite, JavaScript, CSS                    |
| Auth       | Firebase Authentication (email + Google OAuth)  |

## Getting started

### Prerequisites

- Java 23+
- Node.js 18+
- PostgreSQL
- Firebase project with Authentication enabled (Email/Password + Google)

### 1. Clone the repository

```bash
git clone https://github.com/niktsh/bejeweled.git
cd bejeweled
```

### 2. Configure the backend

Copy the example config and fill in your database credentials:

```bash
cp src/main/resources/application.properties.example src/main/resources/application.properties
```

Edit `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/gamestudiojpa
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
```

Create the database:
```sql
CREATE DATABASE gamestudiojpa;
```

### 3. Configure the frontend

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env` with your Firebase project credentials:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the backend

```bash
# From project root
./mvnw spring-boot:run
```

Backend starts at `http://localhost:8080`

### 5. Run the frontend

```bash
cd frontend
npm install
npm install firebase
npm run dev
```

Frontend starts at `http://localhost:5173`

## Academic context

University project — *Komponentové programovanie (Component Programming)*, FEI TUKE, 2025.
