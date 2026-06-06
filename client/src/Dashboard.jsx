import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
} from "chart.js";

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
  RadialLinearScale
);

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/analytics")
      .then((res) => res.json())
      .then(setAnalytics)
      .catch(console.error);
  }, []);

  if (!analytics)
    return <p className="text-center mt-10 text-gray-200">Loading analytics...</p>;

  const recommended = {
    sleep: 7.5,
    activity: 1.5,
    study: 5,
    family: 2,
    water: 2.5,
    stress: 3,
  };

  const moodPieData = {
    labels: Object.keys(analytics.moodCount),
    datasets: [
      {
        data: Object.values(analytics.moodCount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8BC34A"],
      },
    ],
  };

  const sleepDoughnutData = {
    labels: Object.keys(analytics.sleepDist),
    datasets: [
      {
        data: Object.values(analytics.sleepDist),
        backgroundColor: ["#FF9F40", "#FF6384", "#36A2EB", "#4BC0C0"],
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
        backgroundColor: "#36A2EB",
      },
      {
        label: "Recommended Average",
        data: [
          recommended.activity,
          recommended.study,
          recommended.family,
          recommended.water,
        ],
        backgroundColor: "#FFCE56",
      },
    ],
  };

  const stressLineData = {
    labels: analytics.scatterData.map((_, idx) => idx + 1),
    datasets: [
      {
        label: "Stress Levels",
        data: analytics.scatterData.map((d) => d.stress),
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const waterSleepBarData = {
    labels: ["Avg Sleep (hrs)", "Avg Water (L)"],
    datasets: [
      {
        label: "Your Data",
        data: [analytics.avgSleep, analytics.avgWater],
        backgroundColor: ["#36A2EB", "#4BC0C0"],
      },
      {
        label: "Recommended",
        data: [recommended.sleep, recommended.water],
        backgroundColor: "#FFCE56",
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
        backgroundColor: "rgba(75,192,192,0.3)",
        borderColor: "rgba(75,192,192,1)",
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
        backgroundColor: "rgba(255,206,86,0.2)",
        borderColor: "rgba(255,206,86,1)",
      },
    ],
  };

  const correlationBarData = {
    labels: ["Sleep", "Stress", "Activity", "Study"],
    datasets: [
      {
        label: "Correlation Strength",
        data: [0.65, 0.8, 0.55, 0.72],
        backgroundColor: ["#FFB74D", "#E57373", "#64B5F6", "#81C784"],
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
        backgroundColor: ["#4CAF50", "#E0E0E0"],
        borderWidth: 0,
      },
    ],
  };

  const suggestions = [];
  if (analytics.avgSleep < recommended.sleep)
    suggestions.push("⚠️ You're getting less sleep than recommended. Aim for 7–8 hours each night.");
  else suggestions.push("🎉 Great job maintaining healthy sleep habits!");

  if (analytics.avgStress > recommended.stress)
    suggestions.push("⚠️ Your stress levels seem high. Try relaxation techniques like deep breathing or meditation.");
  else suggestions.push("🎉 You're managing stress well. Keep it balanced!");

  if (analytics.avgActivity < recommended.activity)
    suggestions.push("⚠️ Add physical activity to your day. Even a 30-minute walk helps improve mood.");
  else suggestions.push("🎉 Excellent! You’re staying active.");

  if (analytics.avgWater < recommended.water)
    suggestions.push("⚠️ Increase your water intake. Aim for around 2.5 liters daily.");
  else suggestions.push("🎉 Your hydration level looks good — keep it up!");

  if (analytics.avgFamily < recommended.family)
    suggestions.push("⚠️ Spend more time with friends or family to improve social well-being.");
  else suggestions.push("🎉 You’re maintaining healthy social interactions — great!");

  if (analytics.avgStudy > recommended.study + 2)
    suggestions.push("⚠️ You're studying a lot! Take breaks to avoid burnout.");
  else if (analytics.avgStudy < recommended.study - 2)
    suggestions.push("⚠️ Focus a bit more on your studies for consistency.");
  else suggestions.push("🎉 Your study habits are well-balanced.");

  return (
    <div className="min-h-screen bg-blue-900 p-10 font-sans">
      {/* Navigation */}
      <nav className="mb-6">
        <Link to="/" className="text-blue-200 font-semibold hover:underline">
          ← Back to Survey
        </Link>
      </nav>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-10 text-blue-100 text-center tracking-wide">
        Student Wellness Dashboard
      </h1>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Total Submissions", value: analytics.total },
          { label: "Average Stress", value: analytics.avgStress.toFixed(2) },
          { label: "Average Sleep (hrs)", value: analytics.avgSleep.toFixed(2) },
          { label: "Average Activity (hrs)", value: analytics.avgActivity.toFixed(2) },
          { label: "Average Study (hrs)", value: analytics.avgStudy.toFixed(2) },
          { label: "Average Family Interaction (hrs)", value: analytics.avgFamily.toFixed(2) },
          { label: "Average Water (L)", value: analytics.avgWater.toFixed(2) },
        ].map((metric) => (
          <div
            key={metric.label}
            className="bg-white p-5 rounded-xl shadow-md text-center border border-gray-100 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-700">{metric.label}</h2>
            <p className="text-3xl font-bold text-blue-600 mt-1">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Category Charts */}
      <h2 className="text-2xl font-bold mb-6 text-blue-100 text-center">Category Charts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-semibold mb-4 text-center text-lg">Mood Distribution</h3>
          <div className="h-[420px] flex justify-center">
            <Pie data={moodPieData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-semibold mb-4 text-center text-lg">Sleep Distribution</h3>
          <div className="h-[420px] flex justify-center">
            <Doughnut data={sleepDoughnutData} />
          </div>
        </div>
      </div>

      {/* Averages & Trends */}
      <h2 className="text-2xl font-bold mb-6 text-blue-100 text-center">Averages & Trends</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-semibold mb-4 text-center text-lg">Average Metrics</h3>
          <div className="h-[420px] flex justify-center">
            <Bar data={avgBarData} />
          </div>
          <p className="text-center text-sm text-gray-500 mt-3">
            * Recommended daily averages — Sleep: {recommended.sleep} hrs, Activity: {recommended.activity} hrs, 
            Study: {recommended.study} hrs, Family: {recommended.family} hrs, Water: {recommended.water} L, 
            Ideal Stress Level: below {recommended.stress}.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-semibold mb-4 text-center text-lg">Stress Level Trend</h3>
          <div className="h-[420px] flex justify-center">
            <Line data={stressLineData} />
          </div>
        </div>
      </div>

      {/* Wellness Insights */}
      <h2 className="text-2xl font-bold mb-6 text-blue-100 text-center">Wellness Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-semibold mb-4 text-center text-lg">Sleep vs Water Intake</h3>
          <div className="h-[420px] flex justify-center">
            <Bar data={waterSleepBarData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-semibold mb-4 text-center text-lg">Wellness Balance Overview</h3>
          <div className="h-[420px] flex justify-center">
            <Radar data={radarData} />
          </div>
        </div>
      </div>

      {/* Advanced Analytics */}
      <h2 className="text-2xl font-bold mb-6 text-blue-100 text-center">Advanced Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-semibold mb-4 text-center text-lg">Correlation Strengths</h3>
          <div className="h-[420px] flex justify-center">
            <Bar data={correlationBarData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-semibold mb-4 text-center text-lg">Happiness Index ({happinessScore}%)</h3>
          <div className="h-[420px] flex justify-center">
            <Doughnut data={happinessGaugeData} />
          </div>
        </div>
      </div>

      {/* Suggestions Box */}
      <div className="max-w-6xl mx-auto mb-24">
        <h2 className="text-3xl font-bold mb-8 text-blue-100 text-center">Personalized Wellness Suggestions</h2>
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-700 p-12 rounded-3xl shadow-3xl border border-blue-600">
          <ul className="list-disc list-inside space-y-6 text-blue-100 text-xl leading-relaxed">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className={`p-6 rounded-2xl ${
                  s.includes("⚠️")
                    ? "bg-red-100 text-red-800 font-semibold shadow-inner"
                    : "bg-green-100 text-green-800 font-semibold shadow-inner"
                }`}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
