import { ApexOptions } from "apexcharts";
import { FC, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Loading } from "../../components/ui/Loading";

export const StackedBarChart: FC = () => {
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
        const states = [
          { name: "Pago Pendiente", color: "#ffb822" },
          { name: "Pago Confirmado", color: "#ff9f00" },
          { name: "En Preparación", color: "#00b0f0" },
          { name: "En Entrega", color: "#28a745" },
          { name: "Orden Cancelada", color: "#dc3545" },
          { name: "Orden Completada", color: "#17a2b8" },
        ];

        const simulatedData = states.map((state) => ({
          name: state.name,
          data: hours.map(() => Math.floor(Math.random() * 10)),
        }));

        setSeries(simulatedData);
        setCategories(hours);
        setColors(states.map((state) => state.color));
      } catch (error) {
        console.error("Error fetching stacked bar chart data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
      },
    },
    xaxis: {
      categories,
      title: {
        text: "Horas del Día",
      },
    },
    yaxis: {
      title: {
        text: "Número de Órdenes",
      },
    },
    colors,
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  if (loading) return <Loading />;

  return (
    <div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-4 shadow">
      <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-400 opacity-70 mb-4">
        Estados de Órdenes por Hora
      </h3>
      <ReactApexChart
        type="bar"
        options={options}
        series={series}
        height={350}
      />
    </div>
  );
};
