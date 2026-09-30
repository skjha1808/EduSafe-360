# EduSafe-360

## Prepare. Respond. Survive.

EduSafe-360 is a disaster preparedness and response platform designed for schools, colleges, and communities. It provides disaster awareness resources, interactive training modules, emergency support tools, and AI-powered hazard analysis to improve preparedness and response during emergencies.

---

# 🚀 Features

## 🔐 Authentication System
- Secure authentication for Students and Teachers.
- Session-based login system.
- Password encryption using bcrypt.
- Role-based access management.

## 🌍 Disaster Awareness & Training
- Interactive disaster information portal.
- Earthquake, fire, and flood safety modules.
- AR/VR-inspired disaster preparedness simulations.
- Disaster simulation games for awareness training.

## 🤖 AI-Powered Hazard Analysis
- Upload disaster-related images for analysis.
- Detects possible hazards and objects.
- Provides safety recommendations based on detected scenarios.

## 🌦️ Real-Time Monitoring
- Weather monitoring using OpenWeatherMap API.
- Location-based disaster visualization.
- Real-time disaster-related information display.

## 🏥 Emergency Support Network
- Nearby hospitals information.
- Emergency contacts directory.
- Staff and support information.

## 🏢 Building Safety Verification
- Check disaster readiness status of registered educational buildings.
- Safety approval verification module.

## 📱 Progressive Web App (PWA)
- Service worker integration.
- Offline support.
- Installable web application.
- Custom app icons and manifest configuration.

## 📧 Email Services
- Email notifications using Nodemailer.
- Subscription-based disaster alert updates.

---

# 🎯 Target Users

- Students
- Teachers
- Educational Institutions
- Local Communities

---

# 🛠️ Tech Stack

## Frontend
- HTML5
- CSS3
- JavaScript
- EJS Templates

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication & Security
- express-session
- connect-mongo
- bcrypt.js

## APIs & Services
- OpenWeatherMap API
- Google Maps API
- Google Geocoding API
- Nodemailer

---

# 🏗️ Project Architecture

```
User Browser
      |
      |
Frontend (HTML/CSS/JS/EJS)
      |
      |
Express.js Server
      |
      |
MongoDB Database
      |
      |
External APIs
(OpenWeather, Maps, Email Services)
```

---

# 📂 Project Structure

```
EduSafe-360
│
├── config/
│   └── db.js
│
├── models/
│   ├── student.js
│   └── teacher.js
│
├── routes/
│   └── auth.js
│
├── services/
│   └── emailService.js
│
├── public/
│   ├── css/
│   ├── js/
│   ├── icons/
│   ├── manifest.json
│   └── service-worker.js
│
├── views/
│   ├── project.ejs
│   ├── disaster-tracker.html
│   └── disaster modules
│
├── server.js
└── .env
```

---

# ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/skjha1808/My-project.git
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
```

### Run Application

```bash
npm start
```

Application runs on:

```
http://localhost:3000
```

---

# 🔮 Future Enhancements

- Real IoT sensor integration.
- Advanced AI-based disaster prediction models.
- Mobile application support.
- Community emergency response coordination.
- Cloud deployment and scalability improvements.

---

# 👨‍💻 Developed By

Shubham Kumar
