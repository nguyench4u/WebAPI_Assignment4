# CSC3916 Assignment 4 - Movie Review API - Chau Nguyen

## POSTMAN LINK
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/50001195-35bf2826-555f-4bdc-8ee2-af25e7a9cb9a?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D50001195-35bf2826-555f-4bdc-8ee2-af25e7a9cb9a%26entityType%3Dcollection%26workspaceId%3D297285e3-6344-447b-8dac-a1673f7a3c78#?env%5BNguyenChau-HW3%5D=W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJhbnkiLCJzZXNzaW9uVmFsdWUiOiJKV1QuLi4iLCJjb21wbGV0ZVNlc3Npb25WYWx1ZSI6IkpXVCBleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalk1WkRJeE9HWTFNVE15WmpRd01EQXpNak0wWXpCbU5DSXNJblZ6WlhKdVlXMWxJam9pVkdWemREY2lMQ0pwWVhRaU9qRTNOelV6TnpZMk5qWjkuYnZFblJ6dUNqRnlibkZtQ2JmTzFNUW02azNPc0tkSzdVLUdOMklpcWctayIsInNlc3Npb25JbmRleCI6MH1d)

In case the embedded link above does not work, I have attached the JSON files in the /postman folder.

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
