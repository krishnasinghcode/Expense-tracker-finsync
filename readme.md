# Expense tracker - Finsync

# table of contents
- [Expense tracker - Finsync](#expense-tracker---finsync)
- [table of contents](#table-of-contents)
- [Description](#description)
- [screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API documentation](#api-documentation)
- [Contributing](#contributing)

# Description
Finsync is a web application designed to help users track their expenses and manage their finances effectively. It provides a user-friendly interface for adding, editing, and deleting expenses, as well as viewing expense summaries.

Finsync allows users to categorize their expenses, making it easier to analyze spending patterns. The application also supports user authentication, ensuring that each user's data is secure and private.

Finsync is also compatible with Bankstatements, allowing users to import their bank statements and automatically categorize expenses based on the imported data.

# screenshots
![Screenshot 2025-06-09 193935](https://github.com/user-attachments/assets/ea1ed68f-1590-4dd8-8a64-ecc3a06131cd)
![Screenshot 2025-06-09 194006](https://github.com/user-attachments/assets/35a47c2f-3530-44d7-be3f-77bb76e7e87b)
![Screenshot 2025-06-09 194153](https://github.com/user-attachments/assets/76c0f8ea-2fc7-4a18-91a3-5fa8d5b7da1b)
![Screenshot 2025-06-09 194211](https://github.com/user-attachments/assets/7726cebb-b510-406e-bfff-ab1a7c85974b)


# Features
- User authentication (sign up, login, logout)
- Add, edit, and delete expenses
- View expense summaries
- Categorize expenses
- Import bank statements and automatically categorize expenses
- Responsive design for mobile and desktop

# Tech Stack
- Frontend: React, Redux, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)

# Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/krishnasinghcode/Expense-tracker-finsync.git
    cd Expense-tracker-finsync
    ```
2. Install dependencies for the backend:
    ```bash
    cd backend
    npm install
    ```
3. Install dependencies for the frontend:
    ```bash
    cd frontend
    npm install
    ```
4. Set up environment variables:
    Create a `.env` file in the `backend` directory and add the following variables:
     ```plaintext
     PORT=5000
    MONGO_URI=
    JWT_SECRET=
    EMAIL_USER=
    EMAIL_PASS=
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
     ```
5. Start the backend server:
    ```bash
    cd backend
    npm start
    ```
6. Start the frontend server:
    ```bash
    cd frontend
    npm run dev
    ```

# Usage
1. Open your web browser and navigate to `http://localhost:5173` to access the Finsync application.
2. Sign up for a new account or log in with an existing account.
3. use the application to create, edit, and delete cetegories and expenses.
4. View your expense summaries and analyze your spending patterns.
5. Import bank statements to automatically match and categorize expenses.

# API documentation
* **Base URL**: `http://localhost:5000/api`
* **Authentication**: Use JWT for authentication. Include the token in the `Authorization` header for protected routes.
* **Authorisation**:
    - `POST /auth/signup`: Register a new user
    - `POST /auth/login`: Log in an existing user
    - `GET /auth/logout`: Log out the current user
    - `GET /auth/send-verification-otp`: Send an OTP to the user's email for verification
    - `GET /auth/verify-otp`: Verify the user's OTP
    - `GET /auth/send-reset-otp`: Send a reset OTP to the user's email
    - `GET /auth/verify-reset-otp`: Verify the reset OTP
    - `GET /auth/reset-password`: Reset the user's password
    - `GET /auth/me`: Get the current user's details

* **Transaction**:
    - `POST /transaction`: Create a new transaction
    - `GET /transaction`: Get all transactions for the current user
    - `GET /transaction/:id`: Get a specific transaction by ID
    - `PUT /transaction/:id`: Update a specific transaction by ID
    - `DELETE /transaction/:id`: Delete a specific transaction by ID

* **Category**:
    - `GET /categories`: Get all categories for the current user
    - `POST /categories`: Create a new category
    - `PUT /categories/:id`: Update a specific category by ID
    - `DELETE /categories/:id`: Delete a specific category by ID

* **Bank Statement**:
    - `POST /bank-statement`: Upload a bank statement file
    - `GET /bank-statement`: Get all bank statements for the current user
    - `GET /bank-statement/:id`: Get a specific bank statement by ID
    - `DELETE /bank-statement/:id`: Delete a specific bank statement by ID

* **Report**:
    - `GET /report/summary`: Get a summary report of expenses
    - `GET /report/category-breakdown`: Get a breakdown of expenses by category
    - `GET /report/trends`: Get expense trends over time
    - `GET /report/recurring`: Get recurring expenses
    - `GET /report/bank-matches`: Get bank statement matches
    - `GET /report/export`: Export reports in CSV format

* **user**:
    - `GET /user/profile`: Get the current user's profile information
    - `PUT /user/preferences`: Update the current user's preferences

# Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.
