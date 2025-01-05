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
    <div
      className="p-4 mt-12 dark:bg-black dark:text-white max-h-max "
    >
      {!chartData ? (
        <div className="flex justify-center items-center">
          <ReactLoading
            className="dark:bg-white rounded-full"
            type={"bubbles"}
            color={"black"}
            height={80}
            width={80}
          />
        </div>
      ) : (
        <div
          className="chart-container mx-auto h-screen xs:h-10"
        >
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    font: {
                      size: 12,
                    },
                  },
                },
                title: {
                  display: true,
                  text: "Article Trends",
                  font: {
                    size: 16,
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    autoSkip: true,
                    font: {
                      size: 10, 
                    },
                  },
                },
                y: {
                  ticks: {
                    font: {
                      size: 10, 
                    },
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NewsAnalytics;
