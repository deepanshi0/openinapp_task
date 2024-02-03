# API

### Getting Started: 

***Dependencies***
  - Requires Node.js 14.0 or higher
  - An active Twilio account for sending SMS messages
  - A MongoDB Cluster

### Installing
```bash
git clone
cd openinapp
npm install
```
### Configuring
  - Create a .env file in the root directory and fill in the following variables:
    ```plaintext
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    TWILIO_ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    TWILIO_PHONE_NUMBER=your_twilio_phone_number
    ```
### Running the Application
```bash
node index.js
```
### Usage
  - Register User
    - POST /api/register
    - Description: Registers a new user.
    - Body:

      ```json

      {
        "username": "username",
        "password": "password",
        "phone_number": "+12345678901"
      }
      ```
    - Success Response: 201 Created

  - Login
    - POST /api/auth/login
    - Description: Authenticates a user and returns a JWT token.
    - Body:
    
      ```json

        {
          "username": "username",
          "password": "password"
        }
      ```
    - Success Response: 200 OK with JWT token

  - Tasks
    - Create Task
      - POST /tasks
      - Description: Creates a new task. Requires JWT authentication.
      - Headers: Authorization: Bearer <JWT Token>
      - Body:

        ```json
        {
          "title": "Task Title",
          "description": "Task Description",
          "due_date": "YYYY-MM-DD"
        }
        ```
      - Success Response: 201 Created
    - Get All Tasks
      - GET /tasks
      - Description: Retrieves all tasks for the authenticated user. Supports filters like priority and due date, and pagination.
      - Headers: Authorization: Bearer <JWT Token>
      - Query Parameters: priority, due_date, page, limit
      - Success Response: 200 OK

    - Update Task
      - PATCH /tasks/:id
      - Description: Updates specific fields of an existing task. Requires JWT authentication.
      - Headers: Authorization: Bearer <JWT Token>
      - Body (example of updating due date and status):

        ```json

        {
          "due_date": "YYYY-MM-DD",
          "status": "DONE"
        }
        ```
      - Success Response: 200 OK
    - Delete Task (Soft Deletion)
      - DELETE /tasks/:id
      - Description: Marks a task as deleted by setting the deleted_at timestamp. Requires JWT authentication.
      - Headers: Authorization: Bearer <JWT Token>
      - Success Response: 200 OK

  - Subtasks
    - Create Subtask
      - POST /subtasks
      - Description: Creates a new subtask under an existing task. Requires JWT authentication.
      - Headers: Authorization: Bearer <JWT Token>
      - Body:
        ```json
        {
          "task_id": "TaskId",
          "status": 0
        }
        ```
      - Success Response: 201 Created
    - Get All Subtasks
      - GET /subtasks
      - Description: Retrieves all subtasks for the authenticated user's tasks. Supports a filter by task ID.
      - Headers: Authorization: Bearer <JWT Token>
      - Query Parameters: task_id
      - Success Response: 200 OK
    - Update Subtask
      - PATCH /subtasks/:id
      - Description: Updates the status of an existing subtask. Requires JWT authentication.
      - Headers: Authorization: Bearer <JWT Token>
      - Body:
        ```json

        {
          "status": 1
        }
        ```
      - Success Response: 200 OK
    - Delete Subtask (Soft Deletion)
      - DELETE /subtasks/:id
      - Description: Marks a subtask as deleted by setting the deleted_at timestamp. Requires JWT authentication.
      - Headers: Authorization: Bearer <JWT Token>
      - Success Response: 200 OK

### Contributing:
  - Fork the Project
  - Create your Feature Branch (git checkout -b feature/AmazingFeature)
  - Commit your Changes (git commit -m 'Add some AmazingFeature')
  - Push to the Branch (git push origin feature/AmazingFeature)
  - Open a Pull Request
### References:
  - https://www.twilio.com/docs/voice/make-calls?_gl=1*ckadrp*_ga*MTkwOTA0NjIxMi4xNzA2NjczNjQ2*_ga_RRP8K4M4F3*MTcwNjczNzYzMi4yLjEuMTcwNjczODAzNi4wLjAuMA..
  - https://jwt.io/introduction
  - https://www.npmjs.com/package/twilio
  - https://medium.com/@developerom/schedule-cron-jobs-in-node-js-12a6a33d6ed3
