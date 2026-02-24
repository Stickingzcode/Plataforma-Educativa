# School Management API 

Environment variables:
- MONGO_URI
- JWT_SECRET
- PORT (optional)

Install:
npm install

Run (dev):
npm run dev

Run tests:
npm test

---

## API Specification Summary

### Authentication
- `POST /api/auth/login` – public, returns JWT.
- `POST /api/auth/register` – superadmin only.

### Schools (superadmin)
- `POST /api/schools`
- `GET /api/schools`
- `GET /api/schools/:id`
- `PUT /api/schools/:id`
- `DELETE /api/schools/:id`

### Classrooms
- `POST /api/classrooms` – school_admin / superadmin.
- `GET /api/classrooms` – school scoped.
- `GET /api/classrooms/:id`, `PUT`, `DELETE` – RBAC enforced.

### Students
- `POST /api/students` – school_admin / superadmin.
- `GET /api/students` – school scoped.
- `GET /api/students/:id`, `PUT`, `DELETE` – RBAC enforced.

For detailed request/response shapes, refer to the [Swagger UI](http://localhost:4000/docs) after starting the server.

## Request & Response Formats

- All requests use `application/json`.
- Create/update payloads include only the fields shown in the Swagger spec.
- Responses return the created/updated object, without `password` fields.

## Authentication Flow

1. Login or register (superadmin) to receive a JWT.
2. Include `Authorization: Bearer <token>` header on protected endpoints.
3. `auth.middleware` validates JWT and attaches `req.user`.
4. `role.middleware.permit(...)` checks `req.user.role`.

## Error Codes

- `400` – bad input/validation.
- `401` – missing/invalid token.
- `403` – forbidden by role or school mismatch.
- `404` – resource not found.
- `429` – rate limit exceeded.
- `500` – server error.

## Database Schema

```mermaid
erDiagram
    USER ||--o{ SCHOOL : manages
    SCHOOL ||--o{ CLASSROOM : contains
    SCHOOL ||--o{ STUDENT : enrolls
    CLASSROOM ||--o{ STUDENT : seats
    USER }|..|{ CLASSROOM : teaches
    USER }|..|{ STUDENT : belongs