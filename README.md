
# 🏥 Healthcare Appointment System
A Healthcare Appointment System streamlines booking, managing, and tracking appointments by utilizing platforms like Google to populate and display hospitals and health institutions in real-time. It incorporates AI-powered tools for emotion detection via video and pre-assessment recommendations based on uploaded images or prompts, ensuring personalized and efficient care

This is a full-stack **Healthcare Appointment Booking System** built with:

-   **Frontend**: Next.js, React, TypeScript, Ant Design
    
-   **Backend**: ABP Framework (ASP.NET Core)
    

## ✨ Features

### 👨‍⚕️ Providers (Healthcare Professionals)

-   Login & Manage Profile
    
-   Set Working Hours & Availability
    
-   View and Manage Appointments
    
-   Change Appointment Status
    
-   Receive Notifications on New Bookings
    

### 🧑‍⚕️ Patients

-   Sign Up & Login
    
-   Browse Providers
    
-   Book Appointments Based on Availability
    
-   Get Real-time Feedback via Notifications
    

----------

## 🚀 Project Structure

css

CopyEdit

`HealthAppointmentSystem/
├── frontend/ (React + Next.js app)
├── backend/
│   └── healthap/
│       └── 10.0.1/
│           └── aspnetcore/   
│                   └── healthap.sln` 

----------

## 🛠 Prerequisites

Make sure you have the following installed:

-   [Node.js & npm](https://nodejs.org/)
    
-   [Git](https://git-scm.com/)
    
-   [Visual Studio Code](https://code.visualstudio.com/)
    
-   [Visual Studio 2022+](https://visualstudio.microsoft.com/) (with ASP.NET and EF Core workloads)
    

----------

## 📥 Getting Started

### 1. Clone the Repository

bash

CopyEdit

`git clone https://github.com/MishaliaPillay/HealthAppointmentSystem.git` 

----------

## 🌐 Frontend Setup

### 📁 Navigate to the Frontend Folder

bash

CopyEdit

`cd frontend` 

Or right-click the `frontend` folder in VS Code and select **"Open in Integrated Terminal"**.

### 📦 Install Dependencies

bash

CopyEdit

`npm install antd
npm install redux-actions
npm install @ant-design/icons
npm install axios
npm install @reduxjs/toolkit react-redux
npm install --save-dev @types/react-redux
npm install react-toastify
npm install --save-dev @types/moment
npm install dayjs
npm install jwt-decode
npm install @react-google-maps/api
npm install face-api.js
npm install @google/generative-ai
npm install lodash.debounce` 

### ▶️ Run the Frontend

bash

CopyEdit

`npm run dev` 

Open the browser and navigate to the link provided in the terminal (usually `http://localhost:3000`).

----------

## 🔧 Backend Setup

### 📁 Navigate to Backend Solution

1.  Open `backend/HealthAp/src/HealthAp.Web.Host/HealthAp.sln` in **Visual Studio**.
    
2.  Set `HealthAp.Web.Host` as the **Startup Project** (right-click > Set as Startup Project).
    

### ⚙️ Set Up Database

1.  Open **Package Manager Console** (Tools > NuGet Package Manager > PMC).
    
2.  Run the following commands to apply migrations:
    

bash

CopyEdit

`Add-Migration InitialCreate
Update-Database` 

### ▶️ Run the Backend

Click the **Run** button (green play icon) or press **F5** in Visual Studio to start the backend.

----------

## ✅ Usage Flow

-   Visit the frontend ([http://localhost:3000](http://localhost:3000))
    
-   Sign in as either a **Patient** or a **Provider**
    
-   Explore the features:
    
    -   Patients: Book appointments
        
    -   Providers: Manage bookings, set availability
        

----------

## 📌 Notes

-   All API calls from the frontend are made to the backend hosted locally or via configured environment variables.
    
-   JWT-based authentication is used to secure access.
    

----------

## 🧪 Tech Stack

### Frontend:

-   Next.js
    
-   React + TypeScript
    
-   Ant Design
    
-   Redux Toolkit
    
-   Axios
    
-   Google Maps & Generative AI APIs
    
-   face-api.js for emotion recognition
    

### Backend:

-   ASP.NET Core with ABP Framework
    
-   Entity Framework Core
    
-   SQL Server (or your configured DB)
