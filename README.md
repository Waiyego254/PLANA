# Web Based Event Management System

A full-stack Web-based Event Management System built using the Angular framework for the frontend and Node.js with Express for the backend. This application allows event creation, user bookings, and administrative oversight — offering a smooth and efficient event management experience.

# Features

- Event Booking: Users can view and book available events.
- Manager Portal: Managers can create and manage events.
- Admin Dashboard: Admins can oversee all users and events.
- Role-Based Access: Access and functionalities tailored to user roles (User, Manager, Admin).
- Real-Time Updates: Seamless user experience with dynamic event updates.

# Tech Stack
# Frontend
- Angular(vX.X) – Framework
- TypeScript – Language
- RxJS, Angular CLI, SCSS– Tools and Styling

#Backend
- Node.js – Runtime Environment
- Express.js – Web Framework
  Setup Instructions
  Clone the Repository
    
bash
git clone https://github.com/your-username/event-management-system.git
cd event-management-system

 Frontend Setup (Angular)
bash

cd frontend
npm install
ng serve
Visit http://localhost:4200/ to view the frontend.

Backend Setup (Node.js + Express)
bash

cd ../backend
npm install
npm run dev
Server runs at http://localhost:3000/

Ensure your MSSQL database is up and connection details are configured in backend/src/config/db.ts or .env.
- TypeScript – Language
- MSSQL – Database
- Sequelize / mssql – ORM/Database connectivity



