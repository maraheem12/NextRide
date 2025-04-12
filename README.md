# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description

This endpoint allows a new user to register by providing their first name, last name, email, and password. Upon successful registration, a JSON Web Token (JWT) is returned for authentication purposes.

## Request Body

The request body must be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required): The user's first name. Must be at least 3 characters long.
  - `lastname` (string, optional): The user's last name. Must be at least 5 characters long.
- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The user's password. Must be at least 6 characters long.

### Example

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success

- **Status Code**: `201 Created`
- **Response Body**:
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "token": "jwt_token"
  }
  ```

### Error: Validation Error

- **Status Code**: `400 Bad Request`
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Username is required",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

### Error: Email Already Exists

- **Status Code**: `400 Bad Request`
- **Response Body**:
  ```json
  {
    "message": "Email already exists"
  }
  ```

## Notes

- Ensure that the `Content-Type` header is set to `application/json` when making requests to this endpoint.
- The JWT token returned should be used for authenticating subsequent requests to protected endpoints.

# User Login Endpoint Documentation

## Endpoint

`POST /users/login`

## Description

This endpoint allows an existing user to log in by providing their email and password. Upon successful login, a JSON Web Token (JWT) is returned for authentication purposes.

## Request Body

The request body must be a JSON object containing the following fields:

- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The user's password. Must be at least 6 characters long.

### Example

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success

- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "token": "jwt_token"
  }
  ```

### Error: Validation Error

- **Status Code**: `400 Bad Request`
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

### Error: Invalid Credentials

- **Status Code**: `401 Unauthorized`
- **Response Body**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

## Notes

- Ensure that the `Content-Type` header is set to `application/json` when making requests to this endpoint.
- The JWT token returned should be used for authenticating subsequent requests to protected endpoints.

# Captain Login Endpoint Documentation

## Endpoint

`POST /captains/login`

## Description

This endpoint allows an existing captain to log in by providing their email and password. Upon successful login, a JSON Web Token (JWT) is returned for authentication purposes.

## Request Body

The request body must be a JSON object containing the following fields:

- `email` (string, required): The captain's email address. Must be a valid email format.
- `password` (string, required): The captain's password. Must be at least 6 characters long.

### Example

```json
{
  "email": "captain@example.com",
  "password": "password123"
}
```

## Responses

### Success

- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "captain@example.com"
    },
    "token": "jwt_token"
  }
  ```

### Error: Validation Error

- **Status Code**: `400 Bad Request`
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

### Error: Invalid Credentials

- **Status Code**: `401 Unauthorized`
- **Response Body**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

## Notes

- Ensure that the `Content-Type` header is set to `application/json` when making requests to this endpoint.
- The JWT token returned should be used for authenticating subsequent requests to protected endpoints.

# Captain Profile Endpoint Documentation

## Endpoint

`GET /captains/profile`

## Description

This endpoint allows an authenticated captain to retrieve their profile information.

## Responses

### Success

- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "vehicleType": "car",
      "color": "red",
      "plate": "ABC123",
      "capacity": 4
    },
    "status": "active"
  }
  ```

### Error: Unauthorized

- **Status Code**: `401 Unauthorized`
- **Response Body**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

## Notes

- Ensure that the `Content-Type` header is set to `application/json` when making requests to this endpoint.
- The JWT token returned during login should be used for authenticating this request.

# Captain Logout Endpoint Documentation

## Endpoint

`GET /captains/logout`

## Description

This endpoint allows an authenticated captain to log out by clearing the authentication token and blacklisting it to prevent further use.

## Responses

### Success

- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### Error: Unauthorized

- **Status Code**: `401 Unauthorized`
- **Response Body**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

## Notes

- Ensure that the `Content-Type` header is set to `application/json` when making requests to this endpoint.
- The JWT token returned during login should be used for authenticating this request.
### User Logout

**Endpoint:** `GET /user/logout`

**Description:** Logs out the authenticated user by clearing the authentication token and blacklisting it to prevent further use.

**Middleware:**
- `authMiddleware.authUser`: Ensures the user is authenticated by verifying the JWT token and checking if it is not blacklisted.

**Controller Function:** `userController.logoutUser`

**Response:**
- `200 OK`: Successfully logged out the user and blacklisted the token.
  - Example: `{ message: 'Logged out successfully' }`
- `401 Unauthorized`: If the token is invalid or blacklisted.
  - Example: `{ message: 'Access denied. No token provided' }`
  - Example: `{ message: 'Access denied. Token blacklisted' }`
- `404 Not Found`: If the user associated with the token is not found.
  - Example: `{ message: 'User not found' }`

**Usage:**
- The JWT token returned during login should be used for authenticating this request.
- The token can be provided in the `Authorization` header as a Bearer token or in cookies.

**Example Request:**
- The JWT token returned should be used for authenticating subsequent requests to protected endpoints.


