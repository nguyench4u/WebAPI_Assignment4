# CSC3916 Assignment 4 - Movie Review API - Chau Nguyen

## POSTMAN LINK

## Overview
A REST API for managing movies and reviews, built with Node.js, Express, and MongoDB. Extends Assignment 3 by adding a Reviews collection and aggregation support.

## Expanded from Assignment 3
- **Reviews collection** — users can post reviews tied to existing movies (movieId, username, review, rating)
- **Aggregation** — `GET /movies` and `GET /movies/:title` support `?reviews=true` query parameter, which uses MongoDB `$lookup` to return movie data with all associated reviews appended
- **Analytics** — Google Analytics event tracking on `POST /reviews` (extra credit)

## API Endpoints
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/signup` | No | Register a new user |
| POST | `/signin` | No | Sign in, returns JWT token |
| POST | `/movies` | JWT | Add a new movie |
| GET | `/movies` | JWT | Get all movies (add `?reviews=true` to include reviews) |
| GET | `/movies/:title` | JWT | Get a movie by title (add `?reviews=true` to include reviews) |
| POST | `/reviews` | JWT | Post a review for a movie |

## Installation
```bash
npm install
```

## Environment Setup
Create a `.env` file in the root directory:
```
DB=<your MongoDB connection string>
SECRET_KEY=<your JWT secret>
GA_KEY=<your Google Analytics key>
```

## Running the App
```bash
node server.js
```

## Deployed URL
https://webapi-assignment4.onrender.com
