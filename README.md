# 🎓 Student Wellness Data Analytics

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Framework-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![Chart.js](https://img.shields.io/badge/Chart.js-Visualization-FF6384?logo=chartdotjs)
![GitHub forks](https://img.shields.io/github/forks/David-Antony/Student-Wellness-Analytics)
![GitHub license](https://img.shields.io/github/license/David-Antony/Student-Wellness-Analytics)

An intelligent, data-driven wellness monitoring and analytics platform designed to help students track, analyze, and improve their daily habits, mental well-being, and overall lifestyle through interactive visual insights and personalized feedback.

---

# 2. Overview

**Student Wellness Data Analytics** is a modern full-stack wellness tracking application that enables students to monitor key lifestyle indicators such as stress levels, sleep patterns, mood, study hours, water intake, physical activity, screen time, and family/social interactions.

Built using **React.js (Vite + Tailwind CSS v4)** for the frontend and **Node.js + Express.js** for the backend, the platform transforms raw wellness data into meaningful insights through advanced analytics and interactive visualizations.

The application features a resilient and adaptive data architecture powered by **MongoDB** with an automatic fallback mechanism to a **local JSON database (`data.json`)**, ensuring uninterrupted operation even when database connectivity is unavailable.

Using **Chart.js**, the platform generates dynamic dashboards, trend analyses, behavioral correlations, wellness balance assessments, and a customized **Happiness Index** that helps students better understand the relationship between their daily habits and overall well-being.

---

# 3. Features

### 📝 Daily Wellness Check (Survey Form)

* A responsive and user-friendly wellness assessment form designed to capture 8 essential health and lifestyle indicators.
* Features intuitive emoji-based interactions and validation for:

  * Stress Levels
  * Sleep Duration
  * Physical Activity
  * Water Intake
  * Study Hours
  * Family Interaction
  * Screen Time
  * Mood Tracking

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

# 4. Tech Stack

## 🎨 Frontend

* **Core:** React.js (v18.3.1) & Vite
* **Styling:** Tailwind CSS (v4)
* **Routing:** React Router DOM (v7)
* **HTTP Client:** Axios
* **Visualization:** Chart.js & React Chartjs 2

## ⚙️ Backend

* **Runtime:** Node.js & Express.js
* **Database ODM:** Mongoose & MongoDB
* **File Database:** Node.js native filesystem modules (`fs`, `path`) for local JSON fallback
* **Security:** Prepared with `bcryptjs` and `jsonwebtoken` for future authentication
