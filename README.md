# Student Wellness Data Analytics
An interactive, data-driven wellness tracker and analytics dashboard designed specifically for students to monitor, understand, and optimize their daily routines, mental health, and physical well-being.
---
## 2. Overview
**Student Wellness Data Analytics** is a full-stack web application that empowers students to log their daily habits—such as stress levels, sleep duration, mood, study hours, water intake, screen time, and family/social interaction—and receive immediate feedback. 
Built using **React (Vite + Tailwind CSS v4)** on the frontend and **Node.js/Express** on the backend, the platform features a highly adaptive data architecture: it connects to a **MongoDB** database, but automatically falls back to a **local JSON database (`data.json`)** if MongoDB is unavailable. The frontend utilizes **Chart.js** to generate visual graphs, correlation studies, a customized Happiness Index, and a multidimensional Radar balance map.
---
## 3. Features
*   **Daily Wellness Check (Survey Form):**
    *   A responsive, modern questionnaire tracking 8 critical wellness parameters.
    *   Features intuitive emoji icons and clean validation for stress, sleep, physical activity, water intake, study hours, family interaction, screen time, and mood.
*   **Predictive Recommendations & Feedback:**
    *   Instant evaluation of daily entries compared to scientifically recommended thresholds.
    *   Color-coded warning notifications (red for high-risk habits, green for healthy accomplishments) are generated dynamically.
*   **Interactive Analytics Dashboard:**
    *   **Summary Cards:** Displays overall averages for stress, sleep, activity, study, family, and water.
    *   **Mood Distribution:** A colorful *Pie Chart* displaying mood fluctuations (Happy, Neutral, Stressed, Sad).
    *   **Sleep Distribution:** A *Doughnut Chart* grouping sleep hours into ranges (0-4h, 5-6h, 7-8h, 9+h).
    *   **Average vs. Recommended Targets:** A grouped *Bar Chart* comparing student behavior directly against standard targets.
    *   **Stress Level Trend:** A smooth, interactive *Line Chart* outlining stress progression.
    *   **Sleep vs. Water Intake:** An insightful comparative *Bar Chart* contrasting actual hydration and sleep against optimal levels.
    *   **Wellness Balance Overview:** A comprehensive *Radar Chart* mapping out average metrics vs. the ideal balance across 6 axes.
    *   **Correlation Strengths:** Analytical *Bar Chart* showcasing the mathematical correlation strengths between sleep, stress, activity, and study.
    *   **Happiness Index:** A circular *Gauge (Doughnut) Chart* computing a holistic wellness score based on balanced lifestyle ratios.
*   **Resilient Database Fallback System:**
    *   Automatically runs database operations on MongoDB if available.
    *   Gracefully falls back to a local file database (`server/data.json`) if MongoDB connection fails, ensuring zero downtime.
---
## 4. Tech Stack
### Frontend
*   **Core:** React.js (v18.3.1) & Vite
*   **Styling:** Tailwind CSS (v4)
*   **Routing:** React Router DOM (v7)
*   **HTTP Client:** Axios
*   **Visualization:** Chart.js & React Chartjs 2
### Backend
*   **Runtime:** Node.js & Express.js
*   **Database ODM:** Mongoose & MongoDB
*   **File Database:** Node.js native filesystem modules (`fs`, `path`) for local JSON fallback
*   **Security:** Prepared with `bcryptjs` and `jsonwebtoken` for future authentication
---
## 5. Installation
### Prerequisites
*   [Node.js](https://nodejs.org/) (v16.0.0 or higher)
*   [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Optional - falls back to local JSON database automatically)
### Setup Steps
1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/David-Antony/Student-Wellness-Analytics.git
    cd Student-Wellness-Analytics
    ```
2.  **Install & Configure Backend:**
    ```bash
    cd server
    npm install
    ```
    *   To run the backend server in production:
        ```bash
        npm start
        ```
    *   To run the backend server in development mode (with auto-reload):
        ```bash
        npm run dev
        ```
    *   *The server runs on [http://localhost:8000](http://localhost:8000)*
3.  **Install & Configure Frontend:**
    ```bash
    cd ../client
    npm install
    ```
    *   To start the client development server:
        ```bash
        npm run dev
        ```
    *   *The client application will launch on [http://localhost:5173](http://localhost:5173)*
---
## 6. Screenshots
| Daily Wellness Check Form | Wellness Insights Dashboard |
| --- | --- |
| ![Survey Form Placeholder](./client/src/banner.png) | ![Analytics Dashboard Placeholder](./client/src/banner.png) |
---
## 7. Live Demo
The project is hosted and can be viewed live at:  
👉 **[Live Demo URL](https://your-live-demo-link.com)** *(Placeholder)*
---
## 8. Future Improvements
*   **User Profiles & Secure Authentication:** Fully implement JWT and Bcryptjs for secure logins, allowing students to keep their wellness logs private.
*   **Custom Date Range Filtering:** Add calendar-based filters to analyze trends over a specific week, month, or semester.
*   **Report Generation:** Provide an option to export weekly wellness summaries as PDF or CSV reports.
*   **Goal Tracking & Streaks:** Gamify healthy habits by rewarding students with streaks for hitting water, sleep, and exercise goals.
*   **Stress Alerts:** Email or push notification prompts when sleep dips too low or stress levels remain high for consecutive days.
