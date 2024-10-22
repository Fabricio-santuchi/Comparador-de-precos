/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";

Chart.register(
  LinearScale,
  CategoryScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

const GraficoChart = ({ items }) => {
  const canvasRef = useRef(null);
  const myChartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    myChartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: items.map((p) => p.title.substring(0, 20) + "..."),
        datasets: [
          {
            label: "Preço (R$)",
            data: items.map((p) => p.price),
            backgroundColor: "rgba(46, 204, 113, 0.6)",
            borderColor: "rgba(46, 204, 113, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return "R$ " + value.toFixed(2);
              },
            },
          },
          x: {
            type: "category",
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Comparação de Preços",
            font: {
              size: 18,
            },
          },
        },
      },
    });

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [items]);

  return <canvas ref={canvasRef}></canvas>;
};

export default GraficoChart;
