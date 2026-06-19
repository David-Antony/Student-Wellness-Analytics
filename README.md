# 🎓 Student Wellness Data Analytics

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Framework-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![Chart.js](https://img.shields.io/badge/Chart.js-Visualization-FF6384?logo=chartdotjs)

An intelligent, data-driven wellness monitoring and analytics platform designed to help students track, analyze, and improve their daily habits, mental well-being, and overall lifestyle through interactive visual insights and personalized feedback.

---

## 2. Overview

**Student Wellness Data Analytics** is a modern full-stack wellness tracking application that enables students to monitor key lifestyle indicators such as stress levels, sleep patterns, mood, study hours, water intake, physical activity, screen time, and family/social interactions.

Built using **React.js (Vite + Tailwind CSS v4)** for the frontend and **Node.js + Express.js** for the backend, the platform transforms raw wellness data into meaningful insights through advanced analytics and interactive visualizations.

The application features a resilient and adaptive data architecture powered by **MongoDB** with an automatic fallback mechanism to a **local JSON database (`data.json`)**, ensuring uninterrupted operation even when database connectivity is unavailable.

Using **Chart.js**, the platform generates dynamic dashboards, trend analyses, behavioral correlations, wellness balance assessments, and a customized **Happiness Index** that helps students better understand the relationship between their daily habits and overall well-being.

---

## 3. Features

### 📝 Daily Wellness Check (Survey Form)
* A responsive and user-friendly wellness assessment form designed to capture 8 essential health and lifestyle indicators.
* Features intuitive emoji-based interactions and validation for:
  * Stress Levels 😰
  * Sleep Duration 😴
  * Physical Activity 🏃
  * Water Intake 💧
  * Study Hours 📚
  * Family Interaction 👨‍👩‍👧
  * Screen Time 💻
  * Mood Tracking 😊

### 📊 Predictive Recommendations & Feedback
* Instant analysis of submitted wellness data against recommended healthy benchmarks.
* Generates intelligent feedback and actionable recommendations.
* Dynamic color-coded alerts:
  * 🔴 High-risk habit notifications
  * 🟢 Healthy achievement indicators

### 📈 Interactive Analytics Dashboard
* **Summary Cards:** Displays overall averages for stress, sleep, activity, study, family, and water.
* **Mood Distribution:** A colorful *Pie Chart* displaying mood fluctuations (Happy, Neutral, Stressed, Sad).
* **Sleep Distribution:** A *Doughnut Chart* grouping sleep hours into ranges (0-4h, 5-6h, 7-8h, 9+h).
* **Average vs. Recommended Targets:** A grouped *Bar Chart* comparing student behavior directly against standard targets.
* **Stress Level Trend:** A smooth, interactive *Line Chart* outlining stress progression.
* **Sleep vs. Water Intake:** An insightful comparative *Bar Chart* contrasting actual hydration and sleep against optimal levels.
* **Wellness Balance Overview:** A comprehensive *Radar Chart* mapping out average metrics vs. the ideal balance across 6 axes.
* **Correlation Strengths:** Analytical *Bar Chart* showcasing the mathematical correlation strengths between sleep, stress, activity, and study.
* **Happiness Index:** A circular *Gauge (Doughnut) Chart* computing a holistic wellness score based on balanced lifestyle ratios.

### 🔄 Resilient Database Fallback System
* Automatically performs data operations using MongoDB when available.
* Seamlessly falls back to a local JSON database (`server/data.json`) if MongoDB becomes unavailable.
* Ensures continuous functionality and zero data collection interruptions.

---

## 4. Tech Stack

### 🎨 Frontend
* **Core:** React.js (v18.3.1) & Vite
* **Styling:** Tailwind CSS (v4)
* **Routing:** React Router DOM (v7)
* **HTTP Client:** Axios
* **Visualization:** Chart.js & React Chartjs 2

### ⚙️ Backend
* **Runtime:** Node.js & Express.js
* **Database ODM:** Mongoose & MongoDB
* **File Database:** Node.js native filesystem modules (`fs`, `path`) for local JSON fallback
* **Security:** Prepared with `bcryptjs` and `jsonwebtoken` for future authentication

---

## 5. Installation & Running the Project

### Prerequisites
*   [Node.js](https://nodejs.org/) (v16.0.0 or higher)
*   [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Optional - falls back to local JSON database automatically)

### Setup Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/David-Antony/Student-Wellness-Analytics.git
    cd Student-Wellness-Analytics
    ```

---

### Option A: The Quick Start (Single Command - Recommended) 🚀

This method installs dependencies and runs both the **frontend** and **backend** concurrently using a single terminal window.

1.  **Install All Dependencies:**
    From the root directory, run the following command to install all packages for the root, client, and server:
    ```bash
    npm run install-all
    ```

2.  **Start Both Frontend & Backend:**
    Launch both servers simultaneously with:
    ```bash
    npm run dev
    ```
    *   **Frontend (React/Vite):** Runs on [http://localhost:5173](http://localhost:5173)
    *   **Backend (Express):** Runs on [http://localhost:8000](http://localhost:8000)

---

### Option B: Manual Start (Separate Terminals) 💻

If you prefer to run and view logs for the client and server in separate terminal windows, follow these steps:

#### 1. Start the Backend Server
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Run the development server (runs on Port `8000`):
   ```bash
   npm run dev
   ```

#### 2. Start the Frontend Client
1. Open a new terminal window and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install client dependencies:
   ```bash
   npm install
   ```
3. Run the development client (launches on Port `5173`):
   ```bash
   npm run dev
   ```

---

## 6. Screenshots

| Daily Wellness Check Form | Wellness Insights Dashboard |
| --- | --- |
| ![Daily Wellness Check](https://placehold.co/600x400?text=Daily+Wellness+Check) | ![Analytics Dashboard](https://placehold.co/600x400?text=Analytics+Dashboard) |

# Dashboard

![Dashboard](proofs/Data_Analysis_Dashboard1.png)

# MongoDB Data

![MongoDB](proofs/Data_Analysis_Analysed_Data.png)

---

## 7. Live Demo

The project can be configured for deployment. Once hosted, you can add your link here:  
👉 **[Live Demo URL](https://github.com/David-Antony/Student-Wellness-Analytics)** *(Insert your deployed application URL)*

---

## 8. Future Improvements

*   **User Profiles & Secure Authentication:** Fully implement JWT and Bcryptjs for secure logins, allowing students to keep their wellness logs private.
*   **Custom Date Range Filtering:** Add calendar-based filters to analyze trends over a specific week, month, or semester.
*   **Report Generation:** Provide an option to export weekly wellness summaries as PDF or CSV reports.
*   **Goal Tracking & Streaks:** Gamify healthy habits by rewarding students with streaks for hitting water, sleep, and exercise goals.
*   **Stress Alerts:** Email or push notification prompts when sleep dips too low or stress levels remain high for consecutive days.
