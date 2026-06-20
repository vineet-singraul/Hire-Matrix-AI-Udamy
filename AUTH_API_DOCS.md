# HireMatrix — Authentication API Documentation

> **Base URL:** `https://hire-matrix-ai-backend.onrender.com`
> **Timeout:** 60 seconds per request

---

## Table of Contents

1. [Sign Up](#1-sign-up)
2. [Sign In](#2-sign-in)
3. [Forgot Password](#3-forgot-password)
4. [Reset Password](#4-reset-password)
5. [Verify Email](#5-verify-email)
6. [Resend Verification Email](#6-resend-verification-email)
7. [Google OAuth](#7-google-oauth)
8. [Change Password (Authenticated)](#8-change-password-authenticated)
9. [Global Axios Behaviour](#9-global-axios-behaviour)
10. [Password Rules](#10-password-rules)
11. [localStorage Keys](#11-localstorage-keys)

---

## 1. Sign Up

Register a new user account. A verification email is sent automatically after successful registration.

```
POST /user/register
```

### Request Headers

| Header         | Value              | Required |
|----------------|--------------------|----------|
| `Content-Type` | `application/json` | Yes      |

### Request Body

```json
{
  "fullName":  "John Doe",
  "email":     "john.doe@example.com",
  "password":  "Secret@123",
  "mobileNO":  "9876543210",
  "isAgree":   true
}
```

| Field      | Type    | Required | Validation                                                                 |
|------------|---------|----------|----------------------------------------------------------------------------|
| `fullName` | string  | Yes      | Min 3 chars · Letters and spaces only · Max 50 chars                       |
| `email`    | string  | Yes      | Valid email format · Min 12 chars · Max 50 chars                           |
| `password` | string  | Yes      | Min 8 chars · 1 uppercase · 1 lowercase · 1 number · 1 special (`@$!%*?&`) |
| `mobileNO` | string  | Yes      | Exactly 10 digits (numbers only)                                           |
| `isAgree`  | boolean | Yes      | Must be `true` — user has accepted Terms & Privacy Policy                  |

### Success Response — `200 OK`

**Headers**

```
Content-Type: application/json
```

**Body**

```json
{
  "message": "Registration successful. Please verify your email."
}
```

### Error Responses

| Status | Scenario                   | Response Body                                      |
|--------|----------------------------|----------------------------------------------------|
| `400`  | Email already registered   | `{ "message": "Email already exists." }`          |
| `400`  | Validation failed          | `{ "message": "<validation error>" }`             |
| `500`  | Server error               | `{ "message": "Internal server error." }`         |

### Post-Registration Flow

After a `200` response the frontend shows a **"Verify your account"** screen. A verification email is automatically sent to the registered email address. The user cannot sign in until the email is verified.

---

## 2. Sign In

Authenticate an existing user and receive a JWT token.

```
POST /user/login
```

### Request Headers

| Header         | Value              | Required |
|----------------|--------------------|----------|
| `Content-Type` | `application/json` | Yes      |

### Request Body

```json
{
  "email":    "john.doe@example.com",
  "password": "Secret@123"
}
```

| Field      | Type   | Required | Validation                          |
|------------|--------|----------|-------------------------------------|
| `email`    | string | Yes      | Valid email format · Min 12 chars   |
| `password` | string | Yes      | Min 8 chars                         |

### Success Response — `200 OK`

**Headers**

```
Content-Type: application/json
```

**Body**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjFhMmIzYzRkNWU2ZjdhOGI5YzBkMSIsImlhdCI6MTcxOTAwMDAwMCwiZXhwIjoxNzE5MDg2NDAwfQ.abc123",
  "data": {
    "id":       "64f1a2b3c4d5e6f7a8b9c0d1",
    "fullName": "John Doe",
    "email":    "john.doe@example.com",
    "mobileNO": "9876543210"
  },
  "message": "Login successful."
}
```

| Field           | Type   | Description                          |
|-----------------|--------|--------------------------------------|
| `token`         | string | JWT Bearer token — store in localStorage |
| `data.id`       | string | User ID (MongoDB ObjectId)           |
| `data.fullName` | string | User's display name                  |
| `data.email`    | string | User's email address                 |
| `data.mobileNO` | string | User's mobile number                 |
| `message`       | string | Human-readable success message       |

### Error Responses

| Status | Scenario                        | Response Body                                                   |
|--------|---------------------------------|-----------------------------------------------------------------|
| `401`  | Wrong email or password         | `{ "message": "Invalid credentials." }`                        |
| `403`  | Email not verified yet          | `{ "message": "Email not verified." }`                         |
| `400`  | Validation failed               | `{ "message": "<validation error>" }`                          |
| `500`  | Server error                    | `{ "message": "Internal server error." }`                      |

### Notes

- On `403`, the frontend shows a popup asking the user to resend the verification email.
- On success, the following values are stored in `localStorage`:

  | Key        | Value                  |
  |------------|------------------------|
  | `token`    | JWT token from response |
  | `id`       | `data.id`              |
  | `fullName` | `data.fullName`        |
  | `email`    | `data.email`           |
  | `phone`    | `data.mobileNO`        |

- If **Remember Me** is checked, `email` is also saved under `rememberedEmail` in `localStorage`.

---

## 3. Forgot Password

Send a password reset link to the user's registered email address.

```
POST /auth/forgot-password
```

### Request Headers

| Header         | Value              | Required |
|----------------|--------------------|----------|
| `Content-Type` | `application/json` | Yes      |

### Request Body

```json
{
  "email": "john.doe@example.com"
}
```

| Field   | Type   | Required | Validation              |
|---------|--------|----------|-------------------------|
| `email` | string | Yes      | Valid email format      |

### Success Response — `200 OK`

**Headers**

```
Content-Type: application/json
```

**Body**

```json
{
  "message": "Password reset link sent to your email."
}
```

### Error Responses

| Status | Scenario              | Response Body                                          |
|--------|-----------------------|--------------------------------------------------------|
| `404`  | Email not registered  | `{ "message": "Email not found." }`                   |
| `400`  | Validation failed     | `{ "message": "<validation error>" }`                 |
| `500`  | Server error          | `{ "message": "Internal server error." }`             |

### Notes

- The reset link emailed to the user contains a one-time token.
- The link opens the frontend page: `/auth/reset-password/{token}`
- The frontend shows a confirmation screen: "We've sent a password reset link to **{email}**."

---

## 4. Reset Password

Set a new password using the token received in the password reset email.

```
POST /auth/reset-password/:token
```

### URL Parameters

| Parameter | Type   | Required | Description                                          |
|-----------|--------|----------|------------------------------------------------------|
| `token`   | string | Yes      | One-time reset token extracted from the email link   |

**Example URL**

```
POST https://hire-matrix-ai-backend.onrender.com/auth/reset-password/abc123xyz456
```

### Request Headers

| Header         | Value              | Required |
|----------------|--------------------|----------|
| `Content-Type` | `application/json` | Yes      |

### Request Body

```json
{
  "password":        "NewSecret@456",
  "confirmPassword": "NewSecret@456"
}
```

| Field             | Type   | Required | Validation                                                                  |
|-------------------|--------|----------|-----------------------------------------------------------------------------|
| `password`        | string | Yes      | Min 8 chars · 1 uppercase · 1 lowercase · 1 number · 1 special (`@$!%*?&`) |
| `confirmPassword` | string | Yes      | Must exactly match `password`                                               |

### Success Response — `200 OK`

**Headers**

```
Content-Type: application/json
```

**Body**

```json
{
  "message": "Password reset successful."
}
```

### Error Responses

| Status | Scenario                   | Response Body                                                    |
|--------|----------------------------|------------------------------------------------------------------|
| `400`  | Token expired or invalid   | `{ "message": "Failed to reset password. Link may have expired." }` |
| `400`  | Passwords do not match     | `{ "message": "<validation error>" }`                           |
| `400`  | Validation failed          | `{ "message": "<validation error>" }`                           |
| `500`  | Server error               | `{ "message": "Internal server error." }`                       |

### Notes

- On success, the frontend displays **"Password Reset!"** and automatically redirects to `/auth/signin` after **3 seconds**.

---

## 5. Verify Email

Confirm the user's email address using the token received in the registration verification email.

```
GET /auth/verify-email?token={token}
```

### Query Parameters

| Parameter | Type   | Required | Description                                        |
|-----------|--------|----------|----------------------------------------------------|
| `token`   | string | Yes      | Verification token extracted from the email link   |

**Example URL**

```
GET https://hire-matrix-ai-backend.onrender.com/auth/verify-email?token=abc123xyz456
```

### Request Headers

| Header          | Value              | Required |
|-----------------|--------------------|----------|
| `Content-Type`  | `application/json` | No       |

> No body is sent for GET requests.

### Success Response — `200 OK`

**Headers**

```
Content-Type: application/json
```

**Body**

```json
{
  "message": "Email verified successfully."
}
```

### Error Responses

| Status | Scenario                   | Response Body                                                                   |
|--------|----------------------------|---------------------------------------------------------------------------------|
| `400`  | Token expired or invalid   | `{ "message": "An error occurred while verifying your email. Please try again." }` |
| `500`  | Server error               | `{ "message": "Internal server error." }`                                       |

### Notes

- On success the frontend shows a **"Verification Successful"** dialog and the user can proceed to Sign In.
- The email link opens the frontend page: `/auth/verify-email/{token}`

---

## 6. Resend Verification Email

Resend the email verification link to the user's registered email address.

```
POST /auth/resend-verification
```

### Request Headers

| Header         | Value              | Required |
|----------------|--------------------|----------|
| `Content-Type` | `application/json` | Yes      |

### Request Body

```json
{
  "email": "john.doe@example.com"
}
```

| Field   | Type   | Required | Validation             |
|---------|--------|----------|------------------------|
| `email` | string | Yes      | Valid email format     |

### Success Response — `200 OK`

**Headers**

```
Content-Type: application/json
```

**Body**

```json
{
  "message": "Verification email sent."
}
```

### Error Responses

| Status | Scenario                   | Response Body                                                         |
|--------|----------------------------|-----------------------------------------------------------------------|
| `404`  | Email not found            | `{ "message": "Email not found." }`                                   |
| `400`  | Already verified           | `{ "message": "Email is already verified." }`                         |
| `400`  | Validation failed          | `{ "message": "<validation error>" }`                                 |
| `500`  | Server error               | `{ "message": "Internal server error." }`                             |

### Where This Is Triggered

| Trigger                               | Source file                                       |
|---------------------------------------|---------------------------------------------------|
| Email not verified popup during Sign In | `src/app/auth/signin/page.tsx`                  |
| Resend button on post-signup screen   | `src/app/auth/signup/page.tsx`                    |

---

## 7. Google OAuth

Sign in or sign up using a Google account via OAuth 2.0 redirect flow.

### 7a. Sign In with Google

```
GET {BASE_URL}/auth/google
```

**Full URL:** `https://hire-matrix-ai-backend.onrender.com/auth/google`

No request body or headers required. The browser is redirected to this URL via `window.location.assign(...)`.

### 7b. Sign Up with Google

```
GET {BASE_URL}/user/google
```

**Full URL:** `https://hire-matrix-ai-backend.onrender.com/user/google`

Same redirect-based flow as Sign In with Google.

### OAuth Callback — Success

After Google authentication the backend redirects the browser to:

```
https://{your-frontend-domain}/auth/google-success?token={jwt}&id={userId}&email={email}&name={fullName}
```

**Callback Query Parameters**

| Parameter | Type   | Description                   |
|-----------|--------|-------------------------------|
| `token`   | string | JWT Bearer token              |
| `id`      | string | User ID (MongoDB ObjectId)    |
| `email`   | string | User's email address          |
| `name`    | string | User's full name              |

**Frontend Action on Success**

The page `/auth/google-success` extracts these params and stores them in `localStorage`:

| localStorage Key | Value              |
|------------------|--------------------|
| `token`          | `token` param      |
| `id`             | `id` param         |
| `email`          | `email` param      |
| `fullName`       | `name` param       |

Then redirects to `/` (home / dashboard).

### OAuth Callback — Error

```
https://{your-frontend-domain}/auth/google-success?error={errorMessage}
```

| Parameter | Type   | Description                  |
|-----------|--------|------------------------------|
| `error`   | string | URL-encoded error message    |

**Frontend Action on Error:** Redirects to `/auth/signin?error={errorMessage}` and displays the error message on the Sign In page.

---

## 8. Change Password (Authenticated)

Change the password of the currently signed-in user.

```
POST /auth/change-password
```

### Request Headers

| Header          | Value                          | Required |
|-----------------|--------------------------------|----------|
| `Content-Type`  | `application/json`             | Yes      |
| `Authorization` | `Bearer {token}`               | Yes      |

> The `Authorization` header is automatically attached by the Axios interceptor using the `token` stored in `localStorage`.

### Request Body

```json
{
  "oldPassword":     "OldSecret@123",
  "newPassword":     "NewSecret@456",
  "confirmPassword": "NewSecret@456"
}
```

| Field             | Type   | Required | Validation                                                                  |
|-------------------|--------|----------|-----------------------------------------------------------------------------|
| `oldPassword`     | string | Yes      | Current account password                                                    |
| `newPassword`     | string | Yes      | Min 8 chars · 1 uppercase · 1 lowercase · 1 number · 1 special (`@$!%*?&`) · Must differ from `oldPassword` |
| `confirmPassword` | string | Yes      | Must exactly match `newPassword`                                            |

### Success Response — `200 OK`

**Headers**

```
Content-Type: application/json
```

**Body**

```json
{
  "message": "Password changed successfully."
}
```

### Error Responses

| Status | Scenario                        | Response Body                                                       |
|--------|---------------------------------|---------------------------------------------------------------------|
| `401`  | Unauthorized (token missing or expired) | Axios interceptor clears localStorage and redirects to `/auth/signin` |
| `400`  | Wrong current password          | `{ "message": "Current password is incorrect." }`                  |
| `400`  | New and old password are same   | `{ "message": "New password must be different from old password." }` |
| `400`  | Passwords do not match          | `{ "message": "<validation error>" }`                              |
| `400`  | Validation failed               | `{ "message": "<validation error>" }`                              |
| `500`  | Server error                    | `{ "message": "Internal server error." }`                          |

### Notes

- On success the frontend displays a snackbar notification: **"Password changed successfully."**
- This endpoint is available in **Settings → Change Password** (`src/app/components/settings/ChangePassword.tsx`).

---

## 9. Global Axios Behaviour

All API calls go through a shared Axios instance (`src/services/axios.ts`) with the following interceptors:

### Request Interceptor

```
Base URL:        https://hire-matrix-ai-backend.onrender.com
Content-Type:    application/json  (override to multipart/form-data when FormData is sent)
Timeout:         60000 ms
Authorization:   Bearer {token}  — auto-attached if token exists in localStorage
```

### Response Interceptor

| Response Status | Action                                                                                      |
|-----------------|---------------------------------------------------------------------------------------------|
| Any `2xx`       | Return response data normally                                                               |
| `401`           | Clear `token`, `id`, `fullName`, `email`, `phone` from localStorage · Set `sessionExpired=true` in sessionStorage · Redirect to `/auth/signin` |
| Any other error | Throw error so the calling function's `catch` block handles it                             |

---

## 10. Password Rules

All password fields across every endpoint follow the same rules:

| Rule               | Requirement                                  |
|--------------------|----------------------------------------------|
| Minimum length     | 8 characters                                 |
| Uppercase letter   | At least 1 (A–Z)                             |
| Lowercase letter   | At least 1 (a–z)                             |
| Number             | At least 1 (0–9)                             |
| Special character  | At least 1 from `@ $ ! % * ? &`             |

**Regex used:**

```regex
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
```

---

## 11. localStorage Keys

| Key              | Set by                              | Value                     | Cleared by              |
|------------------|-------------------------------------|---------------------------|-------------------------|
| `token`          | Sign In / Google OAuth              | JWT Bearer token          | Sign Out / 401 response |
| `id`             | Sign In / Google OAuth              | MongoDB User ID           | Sign Out / 401 response |
| `fullName`       | Sign In / Google OAuth              | User's display name       | Sign Out / 401 response |
| `email`          | Sign In / Google OAuth              | User's email              | Sign Out / 401 response |
| `phone`          | Sign In                             | User's mobile number      | Sign Out / 401 response |
| `rememberedEmail`| Sign In (Remember Me checked)       | User's email (lowercase)  | Remember Me unchecked   |

---

## Quick Reference

| # | Name                   | Method | Endpoint                          | Auth Required |
|---|------------------------|--------|-----------------------------------|---------------|
| 1 | Sign Up                | POST   | `/user/register`                  | No            |
| 2 | Sign In                | POST   | `/user/login`                     | No            |
| 3 | Forgot Password        | POST   | `/auth/forgot-password`           | No            |
| 4 | Reset Password         | POST   | `/auth/reset-password/:token`     | No            |
| 5 | Verify Email           | GET    | `/auth/verify-email?token=`       | No            |
| 6 | Resend Verification    | POST   | `/auth/resend-verification`       | No            |
| 7 | Google OAuth (Sign In) | GET    | `/auth/google`                    | No            |
| 7 | Google OAuth (Sign Up) | GET    | `/user/google`                    | No            |
| 8 | Change Password        | POST   | `/auth/change-password`           | Yes — Bearer token |
