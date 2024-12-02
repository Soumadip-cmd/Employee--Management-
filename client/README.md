# Employee Management System

A comprehensive MERN stack application for managing employees, leave requests, and payroll processing.

## Features

- **Employee Management**

  - Add, update and delete employee records
  - View employee profiles and history
  - Upload employee photos via Cloudinary integration

- **Leave Management**

  - Submit and track leave requests
  - Review and approve/reject requests
  - Leave history and balance tracking

- **Payroll Processing**
  - Generate monthly payrolls
  - Track salary disbursements
  - Payment history records

## Tech Stack

- **Frontend**: React.js with Context API for state management
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt
- **Image Storage**: Cloudinary
- **Environment Variables**: dotenv

## Setup Instructions

### Backend Setup

1. Navigate to server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file with:

```
ADMIN_EMAIL = <your-admin-email>  
CLIENT_URL = <your-client-url>  
CLOUD_API_KEY = <your-cloudinary-api-key>  
CLOUD_API_SECRET = <your-cloudinary-api-secret>  
CLOUD_NAME = <your-cloudinary-cloud-name>  
CLOUD_URL = <your-cloudinary-url>  
FACEBOOK_APP_ID = <your-facebook-app-id>  
FACEBOOK_APP_SECRET = <your-facebook-app-secret>  
GOOGLE_CLIENT_ID = <your-google-client-id>  
GOOGLE_CLIENT_SECRET = <your-google-client-secret>  
JWT_SECRET = <your-jwt-secret>  
MONGO_URL = <your-mongodb-url>  
MSG = <your-custom-message>  
PORT = <your-server-port>  
SMTP_PASS = <your-smtp-password>  

```

4. Start server:

```bash
nodemon index.js
```

### Frontend Setup

1. Navigate to client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file with:

```
REACT_APP_BACKEND_URL = <your-backend-url>
REACT_APP_GOOGLE_URL = <your-google-api-url>
REACT_APP_FACEBOOK_URL = <your-facebook-api-url>
REACT_APP_CLOUD_NAME = <your-cloudinary-cloud-name>
```

4. Start application:

```bash
npm start
```

## Security Features

- JWT based authentication
- Password hashing with bcrypt
- Protected API routes
- Secure environment variables
- MongoDB Atlas security features

## API Context Management

The application uses React Context API for centralized state management and API calls, providing:

- Centralized data storage
- Reduced prop drilling
- Simplified API integration
- Global state access


## How To Verify JWT?

To authenticate requests, the JWT is stored in the **browser's local storage**. When making API calls, include the **token** in the **request headers** to ensure successful authorization. Failing to include it may result in an error message like:  
`{"msg":"No token, authorization denied"}`

## File Name

-  Middleware > FetchUser.js

### Adding JWT to Request Headers

- **Key**: `token`  
- **Value**: `<JWT Token>`
