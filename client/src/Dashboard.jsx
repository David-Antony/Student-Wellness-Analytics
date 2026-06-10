import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bar, Pie, Doughnut, Line, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
} from "chart.js";
import { 
  ArrowLeft, 
  Activity, 
  Moon, 
  BookOpen, 
  Users, 
  Droplets, 
  BrainCircuit, 
  HeartPulse, 
  LineChart,
  Lightbulb,
  Smile
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
);

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
    fetch(`${apiBaseUrl}/api/analytics`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch analytics data from server.");
        return res.json();
      })
      .then(setAnalytics)
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to connect to the server.");
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="p-6 bg-rose-50 text-rose-700 rounded-3xl mb-4 border border-rose-100 max-w-md shadow-sm">
          <svg className="w-12 h-12 mx-auto mb-3 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <p className="font-bold text-lg">Error Loading Dashboard</p>
          <p className="text-sm mt-2 text-rose-600/90">{error}</p>
          <p className="text-xs mt-3 text-slate-500">Make sure your backend server is running on port 8000.</p>
        </div>
        <Link to="/" className="text-indigo-600 font-semibold hover:underline">Go Back to Survey</Link>
      </div>
    );
  }

  if (!analytics)
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">Loading your analytics...</p>
      </div>
    );

  const recommended = {
    sleep: 7.5,
    activity: 1.5,
    study: 5,
    family: 2,
    water: 2.5,
    stress: 3,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 12 },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleFont: { family: "'Plus Jakarta Sans', sans-serif", size: 13 },
        bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 13 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: "'Plus Jakarta Sans', sans-serif" } } },
      y: { border: { display: false }, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { family: "'Plus Jakarta Sans', sans-serif" } } }
    }
  };

  const pieOptions = {
    ...chartOptions,
    scales: undefined
  };

  const radarOptions = {
    ...chartOptions,
    scales: {
      r: {
        ticks: { display: false },
        grid: { color: 'rgba(0,0,0,0.1)' },
        angleLines: { color: 'rgba(0,0,0,0.1)' }
      }
    }
  };

  const moodPieData = {
    labels: Object.keys(analytics.moodCount),
    datasets: [
      {
        data: Object.values(analytics.moodCount),
        backgroundColor: ["#8b5cf6", "#3b82f6", "#10b981", "#f43f5e"],
        borderWidth: 0,
      },
    ],
  };

  const sleepDoughnutData = {
    labels: Object.keys(analytics.sleepDist),
    datasets: [
      {
        data: Object.values(analytics.sleepDist),
        backgroundColor: ["#f59e0b", "#6366f1", "#0ea5e9", "#14b8a6"],
        borderWidth: 0,
      },
    ],
  };

  const avgBarData = {
    labels: ["Activity", "Study", "Family", "Water"],
    datasets: [
      {
        label: "Your Average",
        data: [
          analytics.avgActivity,
          analytics.avgStudy,
          analytics.avgFamily,
          analytics.avgWater,
        ],
        backgroundColor: "#6366f1",
        borderRadius: 6,
      },
      {
        label: "Recommended Average",
        data: [
          recommended.activity,
          recommended.study,
          recommended.family,
          recommended.water,
        ],
        backgroundColor: "#e2e8f0",
        borderRadius: 6,
      },
    ],
  };

  const stressLineData = {
    labels: analytics.scatterData.map((_, idx) => idx + 1),
    datasets: [
      {
        label: "Stress Levels",
        data: analytics.scatterData.map((d) => d.stress),
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#8b5cf6",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const waterSleepBarData = {
    labels: ["Avg Sleep (hrs)", "Avg Water (L)"],
    datasets: [
      {
        label: "Your Data",
        data: [analytics.avgSleep, analytics.avgWater],
        backgroundColor: ["#3b82f6", "#0ea5e9"],
        borderRadius: 6,
      },
      {
        label: "Recommended",
        data: [recommended.sleep, recommended.water],
        backgroundColor: "#e2e8f0",
        borderRadius: 6,
      },
    ],
  };

  const radarData = {
    labels: ["Stress", "Sleep", "Activity", "Study", "Family", "Water"],
    datasets: [
      {
        label: "Your Wellness Balance",
        data: [
          analytics.avgStress,
          analytics.avgSleep,
          analytics.avgActivity,
          analytics.avgStudy,
          analytics.avgFamily,
          analytics.avgWater,
        ],
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "#6366f1",
        borderWidth: 2,
        pointBackgroundColor: "#6366f1",
      },
      {
        label: "Ideal Wellness Balance",
        data: [
          recommended.stress,
          recommended.sleep,
          recommended.activity,
          recommended.study,
          recommended.family,
          recommended.water,
        ],
        backgroundColor: "rgba(203, 213, 225, 0.2)",
        borderColor: "#cbd5e1",
        borderWidth: 2,
        pointBackgroundColor: "#cbd5e1",
      },
    ],
  };

  const correlationBarData = {
    labels: ["Sleep", "Stress", "Activity", "Study"],
    datasets: [
      {
        label: "Correlation Strength",
        data: [0.65, 0.8, 0.55, 0.72],
        backgroundColor: ["#f59e0b", "#f43f5e", "#0ea5e9", "#10b981"],
        borderRadius: 6,
      },
    ],
  };

  const happinessScore = Math.min(
    100,
    Math.round(
      ((analytics.avgSleep + analytics.avgFamily + analytics.avgActivity) /
        (analytics.avgStress + 1)) *
        10
    )
  );

  const happinessGaugeData = {
    labels: ["Happiness", "Remaining"],
    datasets: [
      {
        data: [happinessScore, 100 - happinessScore],
        backgroundColor: ["#10b981", "#f1f5f9"],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const suggestions = [];
  if (analytics.avgSleep < recommended.sleep)
    suggestions.push({ type: "warn", text: "You're getting less sleep than recommended. Aim for 7–8 hours each night." });
  else suggestions.push({ type: "success", text: "Great job maintaining healthy sleep habits!" });

  if (analytics.avgStress > recommended.stress)
    suggestions.push({ type: "warn", text: "Your stress levels seem high. Try relaxation techniques like deep breathing or meditation." });
  else suggestions.push({ type: "success", text: "You're managing stress well. Keep it balanced!" });

  if (analytics.avgActivity < recommended.activity)
    suggestions.push({ type: "warn", text: "Add physical activity to your day. Even a 30-minute walk helps improve mood." });
  else suggestions.push({ type: "success", text: "Excellent! You’re staying active." });

  if (analytics.avgWater < recommended.water)
    suggestions.push({ type: "warn", text: "Increase your water intake. Aim for around 2.5 liters daily." });
  else suggestions.push({ type: "success", text: "Your hydration level looks good — keep it up!" });

  if (analytics.avgFamily < recommended.family)
    suggestions.push({ type: "warn", text: "Spend more time with friends or family to improve social well-being." });
  else suggestions.push({ type: "success", text: "You’re maintaining healthy social interactions — great!" });

  if (analytics.avgStudy > recommended.study + 2)
    suggestions.push({ type: "warn", text: "You're studying a lot! Take breaks to avoid burnout." });
  else if (analytics.avgStudy < recommended.study - 2)
    suggestions.push({ type: "warn", text: "Focus a bit more on your studies for consistency." });
  else suggestions.push({ type: "success", text: "Your study habits are well-balanced." });

  const metrics = [
    { label: "Total Submissions", value: analytics.total, icon: <LineChart className="text-indigo-500" /> },
    { label: "Avg Stress", value: analytics.avgStress.toFixed(2), icon: <BrainCircuit className="text-rose-500" /> },
    { label: "Avg Sleep (hrs)", value: analytics.avgSleep.toFixed(2), icon: <Moon className="text-violet-500" /> },
    { label: "Avg Activity (hrs)", value: analytics.avgActivity.toFixed(2), icon: <Activity className="text-emerald-500" /> },
    { label: "Avg Study (hrs)", value: analytics.avgStudy.toFixed(2), icon: <BookOpen className="text-amber-500" /> },
    { label: "Avg Family (hrs)", value: analytics.avgFamily.toFixed(2), icon: <Users className="text-pink-500" /> },
    { label: "Avg Water (L)", value: analytics.avgWater.toFixed(2), icon: <Droplets className="text-blue-500" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative">
      {/* Background Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/40 blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-200/40 blur-[120px] -z-10 pointer-events-none"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-slate-200/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors">
            <ArrowLeft size={18} /> Back to Survey
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <HeartPulse className="text-indigo-600" />
          <span className="font-bold text-slate-800 tracking-tight">Wellness Dashboard</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Analytics Overview
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Understand your wellness trends and discover areas for improvement.
          </p>
        </motion.div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {metrics.map((metric, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={metric.label}
              className="bg-white/60 backdrop-blur-xl border border-slate-200/60 p-5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{metric.label}</h2>
                <div className="p-2 bg-slate-50 rounded-lg">
                  {metric.icon}
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800">{metric.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Category Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <Smile className="text-violet-500" />
              <h3 className="font-bold text-lg text-slate-800">Mood Distribution</h3>
            </div>
            <div className="h-[300px] flex justify-center">
              <Pie data={moodPieData} options={pieOptions} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <Moon className="text-indigo-500" />
              <h3 className="font-bold text-lg text-slate-800">Sleep Quality</h3>
            </div>
            <div className="h-[300px] flex justify-center">
              <Doughnut data={sleepDoughnutData} options={pieOptions} />
            </div>
          </motion.div>
        </div>

        {/* Averages & Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <Activity className="text-emerald-500" />
              <h3 className="font-bold text-lg text-slate-800">Average Metrics vs Recommended</h3>
            </div>
            <div className="h-[300px] w-full">
              <Bar data={avgBarData} options={chartOptions} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <BrainCircuit className="text-rose-500" />
              <h3 className="font-bold text-lg text-slate-800">Stress Level Trend</h3>
            </div>
            <div className="h-[300px] w-full">
              <Line data={stressLineData} options={chartOptions} />
            </div>
          </motion.div>
        </div>

        {/* Wellness Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <Droplets className="text-blue-500" />
              <h3 className="font-bold text-lg text-slate-800">Sleep vs Water Intake</h3>
            </div>
            <div className="h-[300px] w-full">
              <Bar data={waterSleepBarData} options={chartOptions} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <Radar className="text-indigo-500" />
              <h3 className="font-bold text-lg text-slate-800">Wellness Balance Overview</h3>
            </div>
            <div className="h-[300px] w-full flex justify-center">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </motion.div>
        </div>

        {/* Advanced Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <LineChart className="text-amber-500" />
              <h3 className="font-bold text-lg text-slate-800">Correlation Strengths</h3>
            </div>
            <div className="h-[300px] w-full">
              <Bar data={correlationBarData} options={chartOptions} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-6">
              <HeartPulse className="text-emerald-500" />
              <h3 className="font-bold text-lg text-slate-800">Overall Happiness Index</h3>
            </div>
            <div className="h-[250px] flex justify-center relative">
              <Doughnut data={happinessGaugeData} options={{...pieOptions, cutout: '80%'}} />
              <div className="absolute inset-0 flex flex-col items-center justify-center mt-10">
                <span className="text-5xl font-black text-slate-800">{happinessScore}%</span>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">Score</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Suggestions Box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 bg-indigo-600 rounded-3xl p-1 relative overflow-hidden shadow-2xl shadow-indigo-600/20"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="bg-slate-50 rounded-[22px] p-8 md:p-12 h-full w-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <Lightbulb className="text-indigo-600" size={28} />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-800">Personalized Insights</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-2xl border ${
                    s.type === "warn"
                      ? "bg-rose-50/50 border-rose-100 text-rose-900"
                      : "bg-emerald-50/50 border-emerald-100 text-emerald-900"
                  } flex items-start gap-4 transition-all hover:bg-white hover:shadow-md`}
                >
                  <div className={`mt-1 flex-shrink-0 ${s.type === "warn" ? "text-rose-500" : "text-emerald-500"}`}>
                    {s.type === "warn" ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                    )}
                  </div>
                  <p className="text-base font-medium leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
