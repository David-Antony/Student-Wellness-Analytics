import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";

function SurveyPage() {
  const [form, setForm] = useState({
    stress: "",
    sleep: "",
    mood: "",
    activity: "",
    water: "",
    studyHours: "",
    familyInteraction: "",
    screenTime: "",
  });

  const [response, setResponse] = useState(null);

  const recommended = {
    sleep: 7.5,
    activity: 1.5,
    study: 5,
    family: 2,
    water: 2.5,
    stress: 3,
    screenTime: 3,
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/wellness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResponse(data);
      setForm({
        stress: "",
        sleep: "",
        mood: "",
        activity: "",
        water: "",
        studyHours: "",
        familyInteraction: "",
        screenTime: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getStressColor = (level) => {
    if (level >= 8) return "bg-red-300 text-red-800";
    if (level >= 5) return "bg-yellow-300 text-yellow-800";
    return "bg-green-300 text-green-800";
  };

  const getPredictiveSuggestions = (data) => {
    const predictions = [];

    if (data.stress > recommended.stress) {
      predictions.push(
        "⚠️ High stress levels can lead to burnout, poor sleep, and reduced focus. Try meditation or relaxation exercises."
      );
    } else {
      predictions.push("🎉 Stress level is good. Maintain your balance!");
    }

    if (data.sleep < recommended.sleep) {
      predictions.push(
        "⚠️ Insufficient sleep may reduce alertness and concentration. Aim for 7–8 hours per night."
      );
    } else {
      predictions.push("🎉 Sleep is good. Keep your routine consistent!");
    }

    if (data.activity < recommended.activity) {
      predictions.push(
        "⚠️ Low physical activity can affect energy levels. Include a walk or workout daily."
      );
    } else {
      predictions.push("🎉 Physical activity is good. Stay active!");
    }

    if (data.water < recommended.water) {
      predictions.push(
        "⚠️ Low hydration can affect health. Drink at least 2.5 liters daily."
      );
    } else {
      predictions.push("🎉 Hydration is excellent. Keep it up!");
    }

    if (data.studyHours < recommended.study - 2) {
      predictions.push(
        "⚠️ Low study hours may impact performance. Try to maintain consistent hours."
      );
    } else if (data.studyHours > recommended.study + 3) {
      predictions.push(
        "⚠️ Overstudying without breaks may cause burnout. Take breaks!"
      );
    } else {
      predictions.push("🎉 Study hours are well-balanced.");
    }

    if (data.familyInteraction < recommended.family) {
      predictions.push(
        "⚠️ Low social interaction may affect mental health. Spend more time with loved ones."
      );
    } else {
      predictions.push("🎉 Social interactions are healthy.");
    }

    if (data.screenTime > recommended.screenTime) {
      predictions.push(
        "⚠️ Excessive screen time may harm sleep and eyes. Follow 20-20-20 rule."
      );
    } else {
      predictions.push("🎉 Screen time is healthy.");
    }

    return predictions;
  };

  return (
    <div className="min-h-screen bg-blue-900 font-sans p-10">
      {/* ===== Hero Section ===== */}
      <header className="relative h-64 bg-gradient-to-r from-blue-400 to-blue-800 flex items-center justify-center text-white rounded-b-3xl shadow-lg mb-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold drop-shadow-lg">
            Student Wellness Dashboard
          </h1>
          <p className="mt-2 text-lg drop-shadow-md">
            Track your wellness and get personalized recommendations 
          </p>
        </div>
      </header>

      {/* ===== Navigation ===== */}
      <nav className="flex justify-center mb-10">
        <Link
          to="/dashboard"
          className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          Go to Dashboard
        </Link>
      </nav>

      {/* ===== Survey Form ===== */}
      <div className="flex justify-center mb-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-xl space-y-6 border border-blue-100 hover:scale-105 transform transition-all"
        >
          <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">
            Daily Wellness Check
          </h3>

          {[
            { label: "Stress Level (1-10):", name: "stress", min: 1, max: 10, icon: "😰" },
            { label: "Sleep Hours:", name: "sleep", min: 0, max: 24, icon: "😴" },
            { label: "Physical Activity (hrs):", name: "activity", min: 0, max: 24, icon: "🏃" },
            { label: "Water Intake (liters):", name: "water", min: 0, max: 10, step: 0.1, icon: "💧" },
            { label: "Study Hours:", name: "studyHours", min: 0, max: 24, icon: "📚" },
            { label: "Family Interaction (hrs):", name: "familyInteraction", min: 0, max: 24, icon: "👨‍👩‍👧" },
            { label: "Screen Time (hrs):", name: "screenTime", min: 0, max: 24, icon: "💻" },
          ].map((field) => (
            <div key={field.name} className="flex items-center gap-3">
              <span className="text-2xl">{field.icon}</span>
              <div className="w-full">
                <label className="block mb-1 font-semibold text-gray-700">{field.label}</label>
                <input
                  type="number"
                  name={field.name}
                  min={field.min}
                  max={field.max}
                  step={field.step || 1}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />
              </div>
            </div>
          ))}

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Mood:</label>
            <select
              name="mood"
              value={form.mood}
              onChange={handleChange}
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            >
              <option value="">Select Mood</option>
              <option value="Happy">Happy</option>
              <option value="Neutral">Neutral</option>
              <option value="Stressed">Stressed</option>
              <option value="Sad">Sad</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-800 text-white font-semibold px-6 py-3 rounded-full w-full hover:scale-105 transform transition-all"
          >
            Submit Survey
          </button>
        </form>
      </div>

      {/* ===== Response & Suggestions ===== */}
      {response && (
        <div className="mx-auto w-full max-w-3xl p-10 bg-white rounded-3xl shadow-2xl border border-blue-100 mb-20">
          <h2 className="font-bold text-3xl mb-6 text-center text-blue-800">
            Your Data & Predictions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-2"><span>😰</span><strong>Stress:</strong> <span className={getStressColor(response.data.stress)}>{response.data.stress}</span></div>
            <div className="flex items-center gap-2"><span>😴</span><strong>Sleep:</strong> {response.data.sleep} hrs</div>
            <div className="flex items-center gap-2"><span>😊</span><strong>Mood:</strong> {response.data.mood}</div>
            <div className="flex items-center gap-2"><span>🏃</span><strong>Activity:</strong> {response.data.activity} hrs</div>
            <div className="flex items-center gap-2"><span>💧</span><strong>Water:</strong> {response.data.water} L</div>
            <div className="flex items-center gap-2"><span>📚</span><strong>Study:</strong> {response.data.studyHours} hrs</div>
            <div className="flex items-center gap-2"><span>👨‍👩‍👧</span><strong>Family:</strong> {response.data.familyInteraction} hrs</div>
            <div className="flex items-center gap-2"><span>💻</span><strong>Screen Time:</strong> {response.data.screenTime} hrs</div>
          </div>

          <h3 className="font-bold text-2xl mb-4 text-center text-blue-700">Predictions & Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getPredictiveSuggestions(response.data).map((s, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl shadow-md hover:shadow-xl transition-all ${
                  s.includes("⚠️")
                    ? "bg-red-100 text-red-800 font-semibold"
                    : "bg-green-100 text-green-800 font-semibold"
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SurveyPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
