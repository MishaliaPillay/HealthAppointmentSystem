# 🏥 Healthcare Appointment System

A Healthcare Appointment System streamlines booking, managing, and tracking appointments by utilizing platforms like Google to populate and display hospitals and health institutions in real-time. It incorporates AI-powered tools for emotion detection via video and pre-assessment recommendations based on uploaded images or prompts, ensuring personalized and efficient care.

This is a full-stack **Healthcare Appointment Booking System** built with:

- **Frontend**: Next.js, React, TypeScript, Ant Design (Hosted on **Vercel**)
- **Backend**: ABP Framework (ASP.NET Core) (Hosted on **Render**)
- **Database**: Hosted on **Azure SQL**

---

## ✨ Features

### 👨‍⚕️ Providers (Healthcare Professionals)

- Login & Manage Profile  
- Set Working Hours & Availability  
- View and Manage Appointments  
- Change Appointment Status  
- Receive Notifications on New Bookings  

> To sign up as a medical practitioner, use the **admin password**: `123qwe#`

### 🧑‍⚕️ Patients

- Sign Up & Login  
- Browse Providers  
- Book Appointments Based on Availability  
- Get Real-time Feedback via Notifications  

---

## 🚀 Project Structure

```
HealthAppointmentSystem/
├── frontend/ (React + Next.js app)
├── backend/
│   └── healthap/
│       └── 10.0.1/
│           └── aspnetcore/   
│               └── healthap.sln
```

---

## 🛠 Prerequisites

Make sure you have the following installed:

- [Node.js & npm](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Visual Studio 2022+](https://visualstudio.microsoft.com/) (with ASP.NET and EF Core workloads)

---

## 📥 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MishaliaPillay/HealthAppointmentSystem.git
```

---

## 🌐 Frontend Setup

### 📁 Navigate to the Frontend Folder

```bash
cd frontend
```

Or right-click the `frontend` folder in Visual Studio Code and select **"Open in Integrated Terminal"**.

### 📦 Install Dependencies

```bash
npm i
```

### ▶️ Run the Frontend

Make sure the **frontend project is opened in Visual Studio Code**, then run:

```bash
npm run dev
```

Open your browser and navigate to the link provided (usually `http://localhost:3000`).

---

## 🔧 Backend Setup

### 📁 Navigate to Backend Solution

1. Open `backend/HealthAp/src/HealthAp.Web.Host/HealthAp.sln` in **Visual Studio**.
2. Set `HealthAp.Web.Host` as the **Startup Project** (right-click > Set as Startup Project).

### ⚙️ Set Up Database

1. Open **Package Manager Console** (Tools > NuGet Package Manager > PMC).
2. Run the following commands:

```powershell
Add-Migration InitialCreate
Update-Database
```

### ▶️ Run the Backend

Click the **Run** button (green play icon) or press **F5** in Visual Studio to start the backend.

---

## ✅ Usage Flow

- Visit the frontend ([http://localhost:3000](http://localhost:3000))
- Sign in as either a **Patient** or a **Provider**
- Explore the features:

  - Patients: Book appointments  
  - Providers: Manage bookings, set availability

---

## 📌 Notes

- All API calls from the frontend are made to the backend hosted locally or via environment variables.
- JWT-based authentication is used to secure access.

---

## 🧪 Tech Stack

### Frontend:

- Next.js  
- React + TypeScript  
- Ant Design  
- Redux Toolkit  
- Axios  
- Google Maps & Generative AI APIs  
- face-api.js for emotion recognition  

### Backend:

- ASP.NET Core with ABP Framework  
- Entity Framework Core  
- SQL Server (Azure-hosted)

---

## 🧠 Domain Model

[Lucidchart Domain Model](https://lucid.app/lucidchart/28f6207b-4b18-4bf1-8b70-e8a468490bbf/edit?page=0_0&invitationId=inv_bd7c012a-641e-4eb1-829d-ae5ce39c9b60)
