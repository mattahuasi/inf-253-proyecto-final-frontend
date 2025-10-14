import { ApexOptions } from "apexcharts";
import { FC } from "react";
import ReactApexChart from "react-apexcharts";

interface PieChartProps {
  series: number[];
  labels: string[];
}

export const PieChart: FC<PieChartProps> = ({ series, labels }) => {
  const options: ApexOptions = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels,
  };

  return <ReactApexChart type="pie" series={series} options={options} />;
};
