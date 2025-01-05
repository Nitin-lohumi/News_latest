import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Line } from "react-chartjs-2";
import ReactLoading from "react-loading";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const NewsAnalytics = () => {
  const { articles } = useOutletContext(); 
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (articles && articles.length > 0) {
      const authorCount = articles.reduce((acc, article) => {
        const author = article.author || "Unknown";
        acc[author] = (acc[author] || 0) + 1;
        return acc;
      }, {});
      const labels = Object.keys(authorCount);
      const data = Object.values(authorCount);
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Author Articles",
            data: data,
            fill: false,
            borderColor: "green",
            tension: 0.2,
          },
        ],
      });
    }
  }, [articles]);

  return (
    <div className="p-4 sm:p-8 mt-28 dark:h-screen">
      {!chartData ? (
          <ReactLoading  className="dark:bg-white rounded-full" type={"bubbles"} color={"black"} height={80} width={80} />
      ) : (
        <div className="chart-container w-full">
          <h3 className="text-xl dark: font-semibold mb-4">Article Trends by Author</h3>
          <div className="w-full" style={{ position: "relative", height: "400px" }}>
            <Line
              data={chartData}
              options={{
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      autoSkip: true,
                    },
                  },
                },
              }}
              height={undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsAnalytics;
