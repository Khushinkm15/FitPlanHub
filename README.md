FitPlanHub 🏋️‍♂️
A Full-Stack Fitness Plan & Subscription Platform
FitPlanHub is a full-stack web application where users can explore and subscribe to fitness plans, while trainers can create and manage their own plans.
The project simulates a real-world fitness subscription system with authentication, role-based access, and time-based subscriptions.

✨ Features

🔐 Authentication
- User & Trainer signup
- Secure login with JWT
- Password hashing using bcrypt
- Role-based access control
  
🧑‍🏫Trainer Dashboard
- Create fitness plans
- Edit or delete own plans only
- Each plan includes:
- Title
  * Description
  * Price
  * Duration (days)

 🧑‍💪 User Subscriptions
- View all available plans
- Subscribe to a plan (simulated payment)
- Access plans after subscribing
- Subscription status:
   * ACTIVE
   * EXPIRED
   * NOT SUBSCRIBED

 📋 Plans & UI
- Landing page showing all plans as cards
- Subscription status badges
- JWT-protected pages
- Logout functionality
- Clean dark-themed UI

 🛠 Tech Stack
Frontend
- HTML
- CSS
- JavaScript

Backend
- Node.js
- Express.js
- MySQL
- bcrypt
- JSON Web Tokens (JWT)

🚀 How to Run the Project
1️⃣ Backend Setup
- cd backend
- npm install
- node main.js
Backend runs on:
http://localhost:5050


2️⃣ Frontend Setup
- Open the frontend folder
- Open login.html or signup.html in a browser
- Make sure backend is running

🔑 Authentication Flow

1. User/Trainer signs up
2. Password is hashed and stored
3. User logs in
4. JWT token is generated
5. Token is stored in browser (localStorage)
6. Token is used for protected APIs

🚀 Additional Features Implemented
- JWT-protected routes
- Role-based dashboards (Trainer / User)
- Subscription expiry handling
- Ownership checks (trainer plans, user subscriptions)
- Search By filter option

🌱 Future Enhancements
- Real payment gateway
- Admin panel
- Trainer analytics
- Profile management
- Plan images & media

Project Structure
FitPlanHub/
│
├── backend/
│   ├── config/
│   │   └── database.js
│   │
│   ├── middlewares/
│   │   └── auth.js
│   │
│   ├── node_modules/
│   │
│   ├── routes/
│   │
│   ├── .env
│   ├── express-test.js
│   ├── main.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── landing/
│   │
│   ├── login/
│   │   ├── login.html
│   │   ├── login.css
│   │   └── login.js
│   │
│   ├── signup/
│   │   ├── signup.html
│   │   ├── signup.css
│   │   └── signup.js
│   │
│   ├── trainer_dashboard/
│   │   ├── trainer.html
│   │   ├── trainer.css
│   │   └── trainer.js
│   │
│   ├── user/
│   │
│   └── images/
│
└── README.md




