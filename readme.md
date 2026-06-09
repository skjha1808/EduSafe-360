# EduSafe-360-
EduSafe 360 – Disaster Preparedness and Response Education System for Schools &amp; Colleges

**Prepare. Respond. Survive.**  
EduSafe 360 is a comprehensive, AI-driven web platform designed to empower schools, colleges, and local communities with the tools and knowledge needed for effective disaster preparedness and response. Our mission is to build resilient communities by leveraging next-generation technology to provide real-time alerts, immersive training simulations, and a coordinated safety network.

---

## ❗ Problem Statement

In an era of increasing climate uncertainty, educational institutions are on the front lines of community vulnerability. According to UNICEF, nearly half of the world's 2.2 billion children are at *extremely high risk* from the impacts of climate change and environmental shocks. Traditional disaster drills are often infrequent and fail to build critical muscle memory needed to act decisively during real emergencies.  

**EduSafe 360 bridges this critical gap by transforming passive learning into active, life-saving experience.**

---

## ✨ Key Features

- **Unified User Authentication**  
  Secure signup and login for Students and Teachers with robust session management for a personalized experience.

- **AI-Powered Prediction Map**  
  Dynamic interactive map powered by Google Maps API that shows real-time risk zones, including:  
  - Live Geospatial Risk Assessment (Safe, Caution, Alert)  
  - Predictive Weather Insights using OpenWeatherMap API for live data and 7-day forecasts

- **Hyper-Realistic AR/VR Drills**  
  Immersive training simulations to build muscle memory for:  
  - Earthquake Safety (Duck, Cover, and Hold)  
  - Fire Evacuation Route Navigation  
  - Flood Safety and High-Ground Strategy

- **Instant Alert & Subscription System**  
  Email subscription for critical disaster alerts powered by Nodemailer.

- **Centralized Support Network**  
  Quick access to local hospitals, trained staff contacts, and official emergency services.

---

## 🎯 Target Audience

- **Primary:** Students and Staff (Teachers, Administration) in Schools & Colleges  
- **Secondary:** Local Community Members, Parents, and Local Disaster Management Authorities

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose ODM  
- **Frontend:** HTML5, CSS3, Vanilla JavaScript  
- **View Engine:** EJS (Embedded JavaScript templates)  
- **Authentication:** express-session, connect-mongo, bcrypt.js  
- **APIs & Services:** Google Maps API, Google Geocoding API, OpenWeatherMap API, Nodemailer

---

## 📂 Project Structure
/EduSafe360
├── config/ # Database connection configuration
├── models/ # Mongoose schemas (Student, Teacher)
├── public/ # Static files (CSS, JS, images)
├── routes/ # Express route definitions (e.g., auth.js)
├── services/ # Helper services (e.g., emailService.js)
├── views/ # EJS and HTML templates
├── .env # Environment variables (API keys, DB URI, secrets)
├── server.js # Main Express server setup and configuration
└── README.md # This file


---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)  
- npm (comes with Node.js)  
- MongoDB (local instance or cloud service like MongoDB Atlas)

### Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/aashish-kumar-singh/edusafe-360.git
   cd edusafe-360

Install dependencies:

npm install


Create a .env file in the root folder and add your credentials:

MONGO_URI=mongodb://localhost:27017/disasterDB
SESSION_SECRET=a_very_long_and_random_secret_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password


Run the server:

npx nodemon server.js
