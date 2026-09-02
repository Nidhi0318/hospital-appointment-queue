# 🏥 Hospital Appointment & Queue Management System

A beginner-friendly **full-stack web application** built using **React.js, Node.js, and Express.js** to manage hospital appointments and patient queues efficiently.

The system allows patients to view doctor availability, book appointments, receive appointment confirmation and token numbers, while doctors can manage their daily queue and call patients one by one.

---

## 📌 Project Overview

Managing hospital appointments manually can lead to long waiting times, overcrowded reception areas, and difficulty maintaining patient queues.

The **Hospital Appointment & Queue Management System** provides a simple digital solution for managing:

* 👨‍⚕️ Doctor availability
* 📅 Patient appointments
* 🎫 Token generation
* 📋 Patient queue
* 🔔 Appointment confirmation
* 🩺 Doctor dashboard
* 📢 Calling the next patient
* ✅ Completed appointments
* ❌ Cancelled appointments
* 📊 Daily appointment statistics

This project is designed as a **beginner-level full-stack application** and demonstrates how a React frontend communicates with a Node.js + Express backend through REST APIs.

---

## ✨ Features

### 👨‍⚕️ Doctor Availability

Patients can view available doctors and their departments/specializations.

Example:

| Doctor           | Department       | Availability |
| ---------------- | ---------------- | ------------ |
| Dr. Arun Kumar   | Cardiology       | Available    |
| Dr. Priya Sharma | General Medicine | Available    |
| Dr. Rahul Kumar  | Orthopedics      | Unavailable  |

---

### 📅 Appointment Booking

Patients can book an appointment by providing required information such as:

* Patient name
* Doctor
* Appointment date
* Appointment time
* Contact information

After successful booking, the system generates an appointment record.

---

### 🎫 Token Generation

Each confirmed appointment receives a unique token number.

Example:

```text
Appointment Confirmed

Patient: Priya
Doctor: Dr. Arun Kumar
Date: 02-09-2026
Time: 10:30 AM
Token Number: A005
Status: Confirmed
```

The token helps maintain the order of patients in the queue.

---

### 🔔 Appointment Confirmation

After an appointment is successfully booked, the application displays confirmation details including:

* Patient name
* Doctor name
* Date
* Time
* Token number
* Appointment status

---

### 📋 Queue Management

The system maintains the current patient queue for each doctor.

Example:

```text
Current Queue

Token A001 → Completed
Token A002 → Completed
Token A003 → Waiting
Token A004 → Waiting
Token A005 → Waiting
```

The doctor can process patients according to their token order.

---

### 🩺 Doctor Dashboard

Doctors can access a dashboard to monitor their appointments.

The dashboard can display:

* Total appointments
* Waiting patients
* Current patient
* Completed appointments
* Cancelled appointments
* Next patient

Example:

```text
Doctor Dashboard

Today's Appointments: 15
Waiting Patients: 6
Completed: 8
Cancelled: 1

Current Patient: Token A009
Next Patient: Token A010
```

---

### 📢 Call Next Patient

The doctor/receptionist can click **"Call Next Patient"** to move the next waiting patient into the current consultation.

Example:

```text
Current Patient
----------------
Token: A010
Patient: Rahul

[ Consultation Started ]
```

After consultation, the appointment can be marked as:

```text
Completed
```

---

### ✅ Completed Appointment

Once the patient consultation is finished, the appointment status can be changed to:

```text
Completed
```

---

### ❌ Cancel Appointment

Appointments can also be cancelled.

The status changes from:

```text
Confirmed
```

to:

```text
Cancelled
```

Cancelled appointments are not called in the active queue.

---

### 📊 Daily Appointment Count

The dashboard displays the number of appointments scheduled for the current day.

Example:

```text
Today's Appointments: 24
Completed: 15
Waiting: 7
Cancelled: 2
```

This provides a quick overview of hospital activity.

---

# 🛠️ Technologies Used

## Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite
* Fetch API

## Backend

* Node.js
* Express.js
* JavaScript
* REST API

## Development Tools

* Visual Studio Code
* npm
* Git
* GitHub
* Browser Developer Tools

---

# 📁 Project Structure

```text
hospital-appointment-queue/
│
├── backend/
│   │
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   │
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── README.md
```

---

# 🔄 Application Workflow

The basic workflow of the system is:

```text
Patient
   │
   ▼
View Doctors
   │
   ▼
Check Availability
   │
   ▼
Book Appointment
   │
   ▼
Appointment Confirmation
   │
   ▼
Token Generated
   │
   ▼
Patient Added to Queue
   │
   ▼
Doctor Dashboard
   │
   ▼
Call Next Patient
   │
   ▼
Consultation
   │
   ▼
Mark Completed
```

---

# 🔌 Backend API

The backend provides REST API endpoints that are accessed by the React frontend.

Typical endpoints include:

### Get Doctors

```http
GET /api/doctors
```

Returns the list of available doctors.

---

### Get Appointments

```http
GET /api/appointments
```

Returns all appointments.

---

### Book Appointment

```http
POST /api/appointments
```

Creates a new appointment.

Example request:

```json
{
  "patientName": "Priya",
  "doctor": "Dr. Arun Kumar",
  "date": "2026-09-02",
  "time": "10:30"
}
```

---

### Update Appointment Status

```http
PUT /api/appointments/:id
```

Used to update appointment status.

Possible statuses:

```text
Waiting
Confirmed
Completed
Cancelled
```

---

### Call Next Patient

```http
PUT /api/queue/next
```

Moves the next waiting patient into the current consultation.

> The exact API routes may vary depending on the backend implementation.

---

# ⚙️ Prerequisites

Before running the project, make sure the following are installed:

### Node.js

Download and install Node.js from the official website.

After installation, verify:

```bash
node -v
```

and:

```bash
npm -v
```

You should see the installed versions.

---

# 🚀 Installation & Setup

## 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

Move into the project directory:

```bash
cd hospital-appointment-queue
```

---

# 🖥️ Run Backend

Open a terminal in VS Code.

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```

The backend should start on the configured port, for example:

```text
Server running on http://localhost:5000
```

**Keep this terminal running.**

---

# 🌐 Run Frontend

Open another terminal in VS Code.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Vite will provide a URL similar to:

```text
http://localhost:5173
```

Open the displayed URL in your browser.

---

# ▶️ Quick Start

You need **two terminals**.

### Terminal 1 — Backend

```bash
cd backend
npm install
npm start
```

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open the Vite URL:

```text
http://localhost:5173
```

Keep both servers running while using the application.

---

# 🧪 Testing the Application

After opening the frontend, test the following workflow:

### Step 1

Open the application.

### Step 2

Check the available doctors.

### Step 3

Select a doctor.

### Step 4

Enter patient details.

### Step 5

Book an appointment.

### Step 6

Verify appointment confirmation.

### Step 7

Check the generated token.

### Step 8

Open the doctor dashboard.

### Step 9

Click **Call Next Patient**.

### Step 10

Mark the appointment as:

```text
Completed
```

You can also test cancellation by cancelling an appointment before it is called.

---

# 🖼️ Main Application Screens

The application can contain the following sections:

### Patient Section

```text
------------------------------------
 Hospital Appointment System
------------------------------------

Available Doctors

Dr. Arun Kumar
Cardiology
[Book Appointment]

Dr. Priya Sharma
General Medicine
[Book Appointment]
------------------------------------
```

### Appointment Section

```text
------------------------------------
 Book Appointment
------------------------------------

Patient Name: ___________

Doctor: [Select Doctor]

Date:   [Select Date]

Time:   [Select Time]

        [Book Appointment]
------------------------------------
```

### Confirmation Section

```text
------------------------------------
 Appointment Confirmed ✓
------------------------------------

Patient: Priya
Doctor: Dr. Arun Kumar
Date: 02-09-2026
Time: 10:30 AM

Token Number
     A005

Status: Confirmed
------------------------------------
```

### Doctor Dashboard

```text
------------------------------------
 Doctor Dashboard
------------------------------------

Today's Appointments     15
Waiting Patients          6
Completed                 8
Cancelled                 1

Current Patient
Token A009 - Rahul

[ Call Next Patient ]

Queue
A010 - Priya     Waiting
A011 - Arun      Waiting
A012 - Sneha     Waiting
------------------------------------
```

---

# 🔐 Data Flow

The application follows a simple client-server architecture.

```text
┌──────────────────────┐
│    React Frontend    │
│                      │
│ Patient Interface    │
│ Doctor Dashboard     │
└──────────┬───────────┘
           │
           │ HTTP Requests
           ▼
┌──────────────────────┐
│   Express Backend    │
│                      │
│ REST API             │
│ Appointment Logic    │
│ Queue Logic          │
└──────────────────────┘
```

The React frontend sends requests to the Express backend using HTTP methods such as:

```text
GET
POST
PUT
DELETE
```

---

# 🎯 Learning Objectives

This project helps beginners understand:

* React component development
* React state management
* Form handling
* Event handling
* API integration
* Fetch API
* Node.js fundamentals
* Express.js
* REST API development
* HTTP methods
* CRUD operations
* Appointment management
* Queue management
* Frontend-backend communication
* Vite development environment
* Git and GitHub workflow

---

# 🔮 Future Enhancements

The project can be extended with several advanced features.

### 👤 Patient Login

Add authentication for patients.

### 👨‍⚕️ Doctor Login

Doctors can securely access their own dashboard.

### 🔐 JWT Authentication

Implement JWT-based authentication for protected APIs.

### 🗄️ Database Integration

Connect the application to:

* MongoDB
* MySQL
* PostgreSQL

This allows appointments and patient records to be permanently stored.

### 📱 SMS/Email Notifications

Send appointment confirmation and queue updates through SMS or email.

### 🔔 Real-Time Queue Updates

Use Socket.IO to update the queue without refreshing the page.

### 📊 Advanced Analytics

Add charts for:

* Daily appointments
* Doctor workload
* Completed appointments
* Cancelled appointments
* Average waiting time

### 🏥 Multiple Departments

Support different hospital departments such as:

* Cardiology
* Neurology
* Orthopedics
* Dermatology
* Pediatrics
* General Medicine

---

# ⚠️ Important Notes

* Make sure the backend is running before using features that require API communication.
* The frontend and backend must use the correct API URL and port.
* Run `npm install` separately inside both `frontend` and `backend`.
* Do not upload the `node_modules` folder to GitHub.
* Make sure `.gitignore` contains:

```text
node_modules/
.env
dist/
```

---

# 🐛 Common Problems

## Backend Does Not Start

Try:

```bash
cd backend
npm install
npm start
```

Check whether the configured backend port is already being used.

---

## Frontend Does Not Start

Try:

```bash
cd frontend
npm install
npm run dev
```

---

## API Connection Error

Make sure the backend is running.

For example:

```text
Frontend → http://localhost:5173
Backend  → http://localhost:5000
```

Also verify that the API URLs used in React match the backend routes.

---

## Port Already in Use

If the backend port is already occupied, stop the existing Node.js process or change the configured port.

---

# 📌 Project Type

**Full-Stack Web Application**

### Level

Beginner

### Domain

Healthcare / Hospital Management

### Architecture

Client-Server Architecture

### Frontend

React + Vite

### Backend

Node.js + Express.js

---

# 👩‍💻 Author

**Your Name**

This project was developed as a beginner-level full-stack application to demonstrate hospital appointment booking and queue management using React, Node.js, and Express.

---

# 📄 License

This project is created for **educational and learning purposes**.

You are free to modify and improve the project for academic or personal use.

---

# ⭐ Future Scope

The Hospital Appointment & Queue Management System can eventually be developed into a complete hospital management platform by adding:

```text
Patient Management
        ↓
Doctor Management
        ↓
Appointment Management
        ↓
Queue Management
        ↓
Electronic Medical Records
        ↓
Billing
        ↓
Pharmacy
        ↓
Reports & Analytics


