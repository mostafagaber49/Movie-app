# 🎬 Movie App API

A professional, production-ready Movie App REST API built with NestJS, TypeScript, MongoDB, and Redis. It provides comprehensive movie discovery features powered by the TMDB (The Movie Database) API, complete with authentication, user management, caching, security rate limiting, interactive Swagger documentation, and full Docker containerization.

---

## 🛠 Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Caching & Session Storage:** [Redis](https://redis.io/)
- **Authentication & Security:** JWT, Passport.js, bcrypt, Helmet, Throttler (Rate Limiting)
- **External Integration:** [TMDB API](https://www.themoviedb.org/documentation/api)
- **API Documentation:** [Swagger / OpenAPI](https://swagger.io/)
- **Containerization:** Docker & Docker Compose
- **Testing:** Jest

---

## ✨ Features

- 🔐 **Authentication & Authorization:** Secure registration, login, JWT access/refresh tokens, and protected routes using Passport strategies.
- 👤 **User Profiles:** Manage account preferences, updates, and profile history.
- 🍿 **Movie Discovery:** Fetch popular, trending, upcoming, and now-playing movies directly integrated with TMDB.
- 🔍 **Search & Details:** Comprehensive movie search filters and detailed media views.
- ❤️ **Favorites & Watchlist:** Add, remove, and track favorite movies and personal watchlists.
- ⭐️ **Reviews & Ratings:** User-submitted ratings and custom reviews stored in MongoDB.
- ⚡ **Caching:** High-performance response caching powered by Redis for TMDB endpoints.
- 🛡 **Security & Rate Limiting:** Global input validation pipes, error handling filters, CORS configuration, and endpoint rate limiting.
- 📑 **Swagger API Docs:** Auto-generated interactive API specification.
- 🧪 **Testing:** Comprehensive unit tests set up with Jest.
- 🐳 **Docker Support:** One-command development environment setup with Docker Compose.

---

## 📋 Prerequisites

Ensure you have the following installed locally:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (or via Docker)
- [Redis](https://redis.io/) (or via Docker)
- [TMDB API Key](https://www.themoviedb.org/settings/api)

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```env
# Application
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/movie-app

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1d

# TMDB API
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=[https://api.themoviedb.org/3](https://api.themoviedb.org/3)