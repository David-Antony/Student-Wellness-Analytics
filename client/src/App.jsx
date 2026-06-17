import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Moon, 
  Dumbbell, 
  Droplets, 
  BookOpen, 
  Users, 
  Monitor, 
  Smile, 
  ArrowRight,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
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
      const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8001";
      const res = await fetch(`${apiBaseUrl}/api/wellness`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(`Error: ${data.message || "Failed to submit survey"}\n${data.error || ""}`);
        return;
      }
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
      
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
    } catch (err) {
      console.error(err);
      alert("Network error: Failed to connect to the server.");
    }
  };

  const getStressColor = (level) => {
    if (level >= 8) return "bg-red-100 text-red-700 border-red-200";
    if (level >= 5) return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
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

  const fields = [
    { label: "Stress Level (1-10)", name: "stress", min: 1, max: 10, icon: <Brain className="text-indigo-500" /> },
    { label: "Sleep Hours", name: "sleep", min: 0, max: 24, icon: <Moon className="text-indigo-500" /> },
    { label: "Physical Activity (hrs)", name: "activity", min: 0, max: 24, icon: <Dumbbell className="text-indigo-500" /> },
    { label: "Water Intake (liters)", name: "water", min: 0, max: 10, step: 0.1, icon: <Droplets className="text-indigo-500" /> },
    { label: "Study Hours", name: "studyHours", min: 0, max: 24, icon: <BookOpen className="text-indigo-500" /> },
    { label: "Family Interaction (hrs)", name: "familyInteraction", min: 0, max: 24, icon: <Users className="text-indigo-500" /> },
    { label: "Screen Time (hrs)", name: "screenTime", min: 0, max: 24, icon: <Monitor className="text-indigo-500" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50/10 font-sans text-slate-100 relative overflow-x-hidden flex flex-col justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-20 opacity-85 pointer-events-none"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Background Decorative Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/50 blur-[100px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-200/50 blur-[100px] -z-10 pointer-events-none"></div>

      {/* ===== Page Content Flow ===== */}
      <AnimatePresence mode="wait">
        {!response ? (
          <motion.section 
            key="survey-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid md:grid-cols-2 gap-4 px-6 py-4 max-w-5xl mx-auto w-full items-center z-10"
          >
            {/* Left – Heading */}
            <div className="flex flex-col items-start justify-center text-left space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
                  Student Wellness <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                    Analytics
                  </span>
                </h1>
                <p className="max-w-md text-base text-slate-200 mb-4">
                  Track your daily habits, understand your emotional well‑being, and get AI‑driven personalized recommendations to improve your academic and personal life.
                </p>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  View Dashboard Analytics <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>

            {/* Right – Survey Form */}
            <main className="px-0 max-w-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-panel p-5 md:p-6 rounded-2xl shadow-xl"
              >
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold text-slate-800">Daily Wellness Check</h2>
                  <p className="text-xs text-slate-500 mt-1">Log your daily metrics to receive insights.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {fields.map((field, idx) => (
                      <div key={field.name} className="relative group">
                        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 mb-1">
                          {field.icon}
                          {field.label}
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name={field.name}
                            min={field.min}
                            max={field.max}
                            step={field.step || 1}
                            value={form[field.name]}
                            onChange={handleChange}
                            placeholder="0"
                            className="w-full bg-white/50 border border-slate-200 px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder-slate-400 text-sm"
                            required
                          />
                        </div>
                      </div>
                    ))}

                    <div className="relative group md:col-span-2">
                      <label className="flex items-center gap-2 text-xs font-medium text-slate-700 mb-1">
                        <Smile className="text-indigo-500" />
                        Overall Mood
                      </label>
                      <div className="relative">
                        <select
                          name="mood"
                          value={form.mood}
                          onChange={handleChange}
                          className="w-full bg-white/50 border border-slate-200 px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 appearance-none cursor-pointer text-sm"
                          required
                        >
                          <option value="" disabled>Select how you feel today</option>
                          <option value="Happy">Happy</option>
                          <option value="Neutral">Neutral</option>
                          <option value="Stressed">Stressed</option>
                          <option value="Sad">Sad</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold px-4 py-2.5 rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 text-sm"
                  >
                    Analyze My Day <ArrowRight size={16} />
                  </motion.button>
                </form>
              </motion.div></main>
          </motion.section>
        ) : (
          <motion.div 
            key="analysis-results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            id="results-section"
            className="glass-panel p-5 md:p-6 rounded-2xl shadow-2xl max-w-4xl mx-auto w-full max-h-[90vh] flex flex-col text-slate-800 z-10"
          >
            <div className="text-center mb-3 flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 mb-1.5">
                <CheckCircle2 size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Analysis Complete</h2>
              <p className="text-xs text-slate-500 mt-0.5">Here is a summary of your day and personalized recommendations.</p>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-4">
              {[
                { label: "Stress", val: response.data.stress, style: getStressColor(response.data.stress) },
                { label: "Sleep", val: `${response.data.sleep}h`, style: "bg-slate-100 text-slate-700 border-slate-200" },
                { label: "Mood", val: response.data.mood, style: "bg-indigo-50 text-indigo-700 border-indigo-100" },
                { label: "Activity", val: `${response.data.activity}h`, style: "bg-slate-100 text-slate-700 border-slate-200" },
                { label: "Water", val: `${response.data.water}L`, style: "bg-blue-50 text-blue-700 border-blue-100" },
                { label: "Study", val: `${response.data.studyHours}h`, style: "bg-slate-100 text-slate-700 border-slate-200" },
                { label: "Family", val: `${response.data.familyInteraction}h`, style: "bg-pink-50 text-pink-700 border-pink-100" },
                { label: "Screen", val: `${response.data.screenTime}h`, style: "bg-slate-100 text-slate-700 border-slate-200" },
              ].map((item, i) => (
                <div key={i} className={`p-2 rounded-xl border ${item.style} flex flex-col items-center justify-center text-center transition-all hover:scale-105`}>
                  <span className="text-[10px] font-semibold uppercase tracking-wider opacity-80 mb-0.5">{item.label}</span>
                  <span className="text-sm font-bold">{item.val}</span>
                </div>
              ))}
            </div>

            {/* Recommendations Section */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">
              {(() => {
                const suggestions = getPredictiveSuggestions(response.data);
                const warnings = suggestions.filter(s => s.includes("⚠️"));
                const successes = suggestions.filter(s => s.includes("🎉"));
                return (
                  <>
                    {warnings.length > 0 && (
                      <div>
                        <h3 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                          <AlertCircle size={14} className="text-amber-500" /> Focus Areas
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {warnings.map((s, i) => (
                            <div key={i} className="p-2.5 rounded-xl border border-rose-100 bg-rose-50/70 text-rose-800 flex gap-2 items-start text-xs">
                              <AlertCircle size={14} className="mt-0.5 shrink-0 text-rose-500" />
                              <p className="font-medium leading-normal">{s.replace("⚠️", "").trim()}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {successes.length > 0 && (
                      <div>
                        <h3 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 size={14} className="text-emerald-500" /> Strengths
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {successes.map((s, i) => (
                            <div key={i} className="px-2.5 py-1 rounded-full border border-emerald-100 bg-emerald-50/70 text-emerald-800 flex items-center gap-1 text-[11px] font-semibold">
                              <CheckCircle2 size={12} className="text-emerald-500" />
                              <span>{s.replace("🎉", "").trim()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center mt-3 border-t border-slate-200/50 pt-3">
              <button
                onClick={() => setResponse(null)}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-2 rounded-xl transition-all text-xs cursor-pointer"
              >
                Refill Survey
              </button>
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all text-xs"
              >
                View Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
