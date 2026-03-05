# API Integration Guide

## Backend API Requirements

This document explains what your backend API should look like to work with the Angular CRUD application.

---

## API Endpoint Configuration

### Base URL
Update in `src/app/services/atelier.service.ts`:

```typescript
private apiUrl = 'YOUR_API_BASE_URL/api/ateliers';
```

### Expected Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/ateliers` | Get all ateliers |
| GET | `/api/ateliers/:id` | Get specific atelier |
| POST | `/api/ateliers` | Create new atelier |
| PUT | `/api/ateliers/:id` | Update atelier |
| DELETE | `/api/ateliers/:id` | Delete atelier |

---

## Request/Response Examples

### 1. GET All Ateliers

**Request:**
```http
GET /api/ateliers HTTP/1.1
Host: api.example.com
Accept: application/json
```

**Response (200 OK):**
```json
[
  {
    "id": "1",
    "nom": "Atelier Ahmed Ali",
    "emailFormateur": "ahmed@example.com",
    "nbrParticipant": 20,
    "statut": true
  },
  {
    "id": "2",
    "nom": "Atelier Fatima Hassan",
    "emailFormateur": "fatima@example.com",
    "nbrParticipant": 18,
    "statut": true
  }
]
```

**cURL:**
```bash
curl -X GET "http://localhost:3000/api/ateliers" \
  -H "Accept: application/json"
```

---

### 2. GET Single Atelier

**Request:**
```http
GET /api/ateliers/1 HTTP/1.1
Host: api.example.com
Accept: application/json
```

**Response (200 OK):**
```json
{
  "id": "1",
  "nom": "Atelier Ahmed Ali",
  "emailFormateur": "ahmed@example.com",
  "nbrParticipant": 20,
  "statut": true
}
```

**Response (404 Not Found):**
```json
{
  "error": "Atelier not found"
}
```

**cURL:**
```bash
curl -X GET "http://localhost:3000/api/ateliers/1" \
  -H "Accept: application/json"
```

---

### 3. POST - Create New Atelier

**Request:**
```http
POST /api/ateliers HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json

{
  "nom": "Atelier Ahmed Ali",
  "emailFormateur": "ahmed@example.com",
  "nbrParticipant": 20,
  "statut": true
}
```

**Response (201 Created):**
```json
{
  "id": "3",
  "nom": "Atelier Ahmed Ali",
  "emailFormateur": "ahmed@example.com",
  "nbrParticipant": 20,
  "statut": true
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Validation failed",
  "details": "nbrParticipant must be greater than 15"
}
```

**cURL:**
```bash
curl -X POST "http://localhost:3000/api/ateliers" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "nom": "Atelier Ahmed Ali",
    "emailFormateur": "ahmed@example.com",
    "nbrParticipant": 20,
    "statut": true
  }'
```

---

### 4. PUT - Update Atelier

**Request:**
```http
PUT /api/ateliers/1 HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json

{
  "nom": "Atelier Ahmed Ali Updated",
  "emailFormateur": "ahmed.new@example.com",
  "nbrParticipant": 25,
  "statut": false
}
```

**Response (200 OK):**
```json
{
  "id": "1",
  "nom": "Atelier Ahmed Ali Updated",
  "emailFormateur": "ahmed.new@example.com",
  "nbrParticipant": 25,
  "statut": false
}
```

**Response (404 Not Found):**
```json
{
  "error": "Atelier not found"
}
```

**cURL:**
```bash
curl -X PUT "http://localhost:3000/api/ateliers/1" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "nom": "Atelier Ahmed Ali Updated",
    "emailFormateur": "ahmed.new@example.com",
    "nbrParticipant": 25,
    "statut": false
  }'
```

---

### 5. DELETE - Delete Atelier

**Request:**
```http
DELETE /api/ateliers/1 HTTP/1.1
Host: api.example.com
Accept: application/json
```

**Response (200 OK / 204 No Content):**
```json
{
  "message": "Atelier deleted successfully"
}
```

Or just empty with 204 status.

**Response (404 Not Found):**
```json
{
  "error": "Atelier not found"
}
```

**cURL:**
```bash
curl -X DELETE "http://localhost:3000/api/ateliers/1" \
  -H "Accept: application/json"
```

---

## Data Validation

Your backend MUST validate:

### nom (Name)
- ✅ Required
- ✅ Minimum 5 characters
- ✅ Maximum any length
- ❌ Cannot be empty

### emailFormateur (Instructor Email)
- ✅ Required
- ✅ Valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- ❌ Must be a proper email

### nbrParticipant (Participants)
- ✅ Required
- ✅ Must be a number
- ✅ Must be greater than 15
- ✅ Should be positive integer

### statut (Status)
- ✅ Required
- ✅ Must be boolean (true/false)
- ✅ Default value: true

---

## HTTP Status Codes

Your API should return appropriate HTTP status codes:

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 204 | No Content | DELETE with no response body |
| 400 | Bad Request | Validation errors |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Server-side error |

---

## CORS Configuration

Your backend MUST enable CORS for Angular to access it:

### Node.js / Express Example
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```

### Python / Flask Example
```python
from flask_cors import CORS
CORS(app, supports_credentials=True)
```

### Java / Spring Boot Example
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:4200")
                    .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}
```

---

## Error Response Format

When validation fails, your API should return:

```json
{
  "error": "Validation failed",
  "details": {
    "nom": "Nom must be at least 5 characters",
    "emailFormateur": "Invalid email format",
    "nbrParticipant": "Must be greater than 15"
  }
}
```

Or a single error message:

```json
{
  "error": "Validation failed",
  "message": "nbrParticipant must be greater than 15"
}
```

---

## Testing Endpoints Locally

### Using Postman
1. Create a new GET request to `http://localhost:3000/api/ateliers`
2. Click "Send"
3. View the response in the Response tab

### Using VS Code REST Client Extension
Create a file `test.http`:

```http
### Get all ateliers
GET http://localhost:3000/api/ateliers

### Get specific atelier
GET http://localhost:3000/api/ateliers/1

### Create new atelier
POST http://localhost:3000/api/ateliers
Content-Type: application/json

{
  "nom": "Atelier Ahmed Ali",
  "emailFormateur": "ahmed@example.com",
  "nbrParticipant": 20,
  "statut": true
}

### Update atelier
PUT http://localhost:3000/api/ateliers/1
Content-Type: application/json

{
  "nom": "Atelier Ahmed Ali Updated",
  "emailFormateur": "ahmed.new@example.com",
  "nbrParticipant": 25,
  "statut": false
}

### Delete atelier
DELETE http://localhost:3000/api/ateliers/1
```

### Using Thunder Client (VS Code)
Similar to above - create request collection for testing

---

## Example Database Schema (SQL)

```sql
CREATE TABLE ateliers (
  id VARCHAR(36) PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  emailFormateur VARCHAR(255) NOT NULL,
  nbrParticipant INT NOT NULL,
  statut BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add validation constraints
ALTER TABLE ateliers ADD CONSTRAINT nom_min_length CHECK (LENGTH(nom) >= 5);
ALTER TABLE ateliers ADD CONSTRAINT nbr_min CHECK (nbrParticipant > 15);
```

---

## Authentication (Optional)

If your API requires authentication, modify the service:

```typescript
// In atelier.service.ts
private getHeaders() {
  const token = localStorage.getItem('token');
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
}

getAteliers(): Observable<Atelier[]> {
  return this.http.get<Atelier[]>(
    this.apiUrl,
    { headers: this.getHeaders() }
  );
}
```

---

## Rate Limiting (Optional)

If your API has rate limits, handle them:

```typescript
// Add error interceptor in app-module.ts
// (Optional: for advanced use)
```

---

## API Response Example (Full)

Here's a complete example of what your API responses should look like:

### List Response
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "nom": "Atelier Ahmed Ali",
      "emailFormateur": "ahmed@example.com",
      "nbrParticipant": 20,
      "statut": true
    },
    {
      "id": "2",
      "nom": "Atelier Fatima Hassan",
      "emailFormateur": "fatima@example.com",
      "nbrParticipant": 18,
      "statut": true
    }
  ],
  "total": 2
}
```

Or simpler (just array):
```json
[
  {
    "id": "1",
    "nom": "Atelier Ahmed Ali",
    "emailFormateur": "ahmed@example.com",
    "nbrParticipant": 20,
    "statut": true
  }
]
```

The Angular service will work with either format!

---

## Troubleshooting API Issues

### Issue: "Failed to load ateliers"
- Check API is running: `curl http://localhost:3000/api/ateliers`
- Check CORS headers in response
- Check browser console for detailed error

### Issue: CORS errors
- Backend must include: `Access-Control-Allow-Origin: http://localhost:4200`
- Backend must include: `Access-Control-Allow-Methods: GET, POST, PUT, DELETE`

### Issue: 404 errors on specific endpoints
- Check endpoint path matches exactly
- Check if ID exists in database
- Check API URL in service matches exactly

### Issue: Validation errors
- Ensure all required fields are sent
- Check data types match (string, number, boolean)
- Ensure constraints are met (nom >= 5 chars, nbrParticipant > 15)

---

## Summary

Your API should:
1. ✅ Accept requests from `http://localhost:4200`
2. ✅ Validate all input data
3. ✅ Return proper HTTP status codes
4. ✅ Return JSON format data
5. ✅ Handle CRUD operations
6. ✅ Include all required fields in responses

With this setup, the Angular application will work perfectly with your backend API!
