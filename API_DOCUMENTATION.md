# API Routes Documentation

## Overview

This document describes all available API endpoints for the Events and Bookings system.

## Base URL

```
http://localhost:3000/api
```

---

## Events API

### 1. Get All Events

**Endpoint:** `GET /api/events`

**Query Parameters:**

- `mode` (optional): Filter by event mode (`online`, `offline`, `hybrid`)
- `tag` (optional): Filter by tag

**Example Request:**

```bash
# Get all events
curl http://localhost:3000/api/events

# Filter by mode
curl http://localhost:3000/api/events?mode=online

# Filter by tag
curl http://localhost:3000/api/events?tag=workshop
```

**Response (200 OK):**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Next.js Workshop",
      "slug": "nextjs-workshop",
      "description": "Learn Next.js from scratch",
      "overview": "Comprehensive workshop on Next.js",
      "image": "/images/nextjs.jpg",
      "venue": "Tech Hub",
      "location": "San Francisco, CA",
      "date": "2024-01-15",
      "time": "14:00",
      "mode": "hybrid",
      "audience": "Developers",
      "agenda": ["Introduction", "Hands-on coding", "Q&A"],
      "organizer": "Tech Events Inc",
      "tags": ["nextjs", "workshop", "web-development"],
      "createdAt": "2024-01-01T10:00:00.000Z",
      "updatedAt": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

---

### 2. Create Event

**Endpoint:** `POST /api/events`

**Content-Type:** `multipart/form-data`

**Request Body:**

```javascript
const formData = new FormData();
formData.append("title", "Next.js Workshop");
formData.append("description", "Learn Next.js from scratch");
formData.append("overview", "Comprehensive workshop on Next.js");
formData.append("image", "/images/nextjs.jpg");
formData.append("venue", "Tech Hub");
formData.append("location", "San Francisco, CA");
formData.append("date", "2024-01-15"); // or '01/15/2024'
formData.append("time", "2:00 PM"); // or '14:00'
formData.append("mode", "hybrid");
formData.append("audience", "Developers");
formData.append("organizer", "Tech Events Inc");
formData.append(
  "agenda",
  JSON.stringify(["Introduction", "Hands-on coding", "Q&A"])
);
formData.append(
  "tags",
  JSON.stringify(["nextjs", "workshop", "web-development"])
);
```

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/events \
  -F "title=Next.js Workshop" \
  -F "description=Learn Next.js from scratch" \
  -F "overview=Comprehensive workshop on Next.js" \
  -F "image=/images/nextjs.jpg" \
  -F "venue=Tech Hub" \
  -F "location=San Francisco, CA" \
  -F "date=2024-01-15" \
  -F "time=2:00 PM" \
  -F "mode=hybrid" \
  -F "audience=Developers" \
  -F "organizer=Tech Events Inc" \
  -F 'agenda=["Introduction","Hands-on coding","Q&A"]' \
  -F 'tags=["nextjs","workshop","web-development"]'
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Next.js Workshop",
    "slug": "nextjs-workshop",
    "date": "2024-01-15",
    "time": "14:00",
    ...
  }
}
```

**Error Responses:**

- `400 Bad Request`: Validation failed
- `409 Conflict`: Event with similar title already exists
- `500 Internal Server Error`: Server error

---

### 3. Get Event by Slug

**Endpoint:** `GET /api/events/[slug]`

**Example Request:**

```bash
curl http://localhost:3000/api/events/nextjs-workshop
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Next.js Workshop",
    "slug": "nextjs-workshop",
    ...
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "error": "Event not found"
}
```

---

### 4. Update Event

**Endpoint:** `PUT /api/events/[slug]`

**Content-Type:** `application/json`

**Request Body:**

```json
{
  "title": "Advanced Next.js Workshop",
  "time": "3:00 PM"
}
```

**Example Request:**

```bash
curl -X PUT http://localhost:3000/api/events/nextjs-workshop \
  -H "Content-Type: application/json" \
  -d '{"title":"Advanced Next.js Workshop","time":"3:00 PM"}'
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Event updated successfully",
  "data": {
    ...
  }
}
```

---

### 5. Delete Event

**Endpoint:** `DELETE /api/events/[slug]`

**Example Request:**

```bash
curl -X DELETE http://localhost:3000/api/events/nextjs-workshop
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Event deleted successfully",
  "data": {
    ...
  }
}
```

---

## Bookings API

### 1. Get All Bookings

**Endpoint:** `GET /api/bookings`

**Query Parameters:**

- `eventId` (optional): Filter by event ID
- `email` (optional): Filter by user email

**Example Request:**

```bash
# Get all bookings
curl http://localhost:3000/api/bookings

# Filter by event
curl http://localhost:3000/api/bookings?eventId=507f1f77bcf86cd799439011

# Filter by email
curl http://localhost:3000/api/bookings?email=user@example.com
```

**Response (200 OK):**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "507f191e810c19729de860ea",
      "eventId": {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Next.js Workshop",
        "slug": "nextjs-workshop",
        "date": "2024-01-15",
        "time": "14:00",
        "location": "San Francisco, CA"
      },
      "email": "user@example.com",
      "createdAt": "2024-01-01T10:00:00.000Z",
      "updatedAt": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

---

### 2. Create Booking

**Endpoint:** `POST /api/bookings`

**Content-Type:** `application/json`

**Request Body:**

```json
{
  "eventId": "507f1f77bcf86cd799439011",
  "email": "user@example.com"
}
```

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"eventId":"507f1f77bcf86cd799439011","email":"user@example.com"}'
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "_id": "507f191e810c19729de860ea",
    "eventId": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Next.js Workshop",
      "slug": "nextjs-workshop",
      "date": "2024-01-15",
      "time": "14:00",
      "location": "San Francisco, CA"
    },
    "email": "user@example.com",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
}
```

**Error Responses:**

- `400 Bad Request`: Missing required fields or invalid email
- `404 Not Found`: Event does not exist
- `409 Conflict`: Booking already exists for this email and event
- `500 Internal Server Error`: Server error

---

### 3. Get Booking by ID

**Endpoint:** `GET /api/bookings/[id]`

**Example Request:**

```bash
curl http://localhost:3000/api/bookings/507f191e810c19729de860ea
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "_id": "507f191e810c19729de860ea",
    "eventId": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Next.js Workshop",
      "slug": "nextjs-workshop",
      "date": "2024-01-15",
      "time": "14:00",
      "location": "San Francisco, CA",
      "venue": "Tech Hub",
      "mode": "hybrid"
    },
    "email": "user@example.com",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
}
```

---

### 4. Cancel Booking

**Endpoint:** `DELETE /api/bookings/[id]`

**Example Request:**

```bash
curl -X DELETE http://localhost:3000/api/bookings/507f191e810c19729de860ea
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": {
    ...
  }
}
```

---

## Frontend Integration Examples

### Creating an Event (React/Next.js)

```typescript
async function createEvent(eventData: FormData) {
  try {
    const response = await fetch("/api/events", {
      method: "POST",
      body: eventData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to create event");
    }

    return result.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}
```

### Creating a Booking

```typescript
async function createBooking(eventId: string, email: string) {
  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId, email }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to create booking");
    }

    return result.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}
```

### Fetching Events

```typescript
async function getEvents(filters?: { mode?: string; tag?: string }) {
  try {
    const params = new URLSearchParams();
    if (filters?.mode) params.append("mode", filters.mode);
    if (filters?.tag) params.append("tag", filters.tag);

    const response = await fetch(`/api/events?${params.toString()}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch events");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}
```

---

## Notes

1. **Date Format**: The API accepts various date formats (ISO, MM/DD/YYYY, etc.) and normalizes them to YYYY-MM-DD
2. **Time Format**: Accepts both 12-hour (2:00 PM) and 24-hour (14:00) formats, normalizes to HH:MM
3. **Slug Generation**: Event slugs are automatically generated from titles
4. **Validation**: All required fields are validated before saving
5. **Event Reference**: Bookings validate that the referenced event exists before creation
6. **Duplicate Prevention**: Cannot create multiple bookings for the same email and event
