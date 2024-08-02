import React from "react";
import { PieChart, Pie, Cell, Tooltip, PieLabelRenderProps } from "recharts";
import { useFetchUserDebt } from "../utils/customHooks";

const PieChartPartialDebt = () => {
  const { debt } = useFetchUserDebt();

  const unpaidCount =
    debt?.filter((d) => d.paymentStatus === "Unpaid").length || 0;
  const partialPaidCount =
    debt.filter((d) => d.paymentStatus === "Partially Paid").length || 0;
  const paidCount = debt.filter((d) => d.paymentStatus === "Paid").length || 0;

  // Veriler ve renkler
  const data = [
    { name: "Other Debt", value: unpaidCount + paidCount },
    { name: "Partially Paid", value: partialPaidCount },
  ];

  const COLORS = ["#fd810eea", "#e9e20f"];

  // Özelleştirilmiş etiketleme fonksiyonu
  const renderCustomizedLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    const RADIAN = Math.PI / 180;
    const radius = ((innerRadius as number) + (outerRadius as number)) / 2;
    const x = (cx as number) + radius * Math.cos(-midAngle! * RADIAN);
    const y = (cy as number) + radius * Math.sin(-midAngle! * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > (cx as number) ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12px" // Font boyutunu biraz büyüttük
      >
        {`${(percent! * 100).toFixed(2)}%`}
      </text>
    );
  };

  return (
    <div className="col-span-3 flex flex-col items-center">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100} // Grafik merkezini genişlettik
          cy={100}
          labelLine={false}
          label={renderCustomizedLabel}
     
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <h6 className="-mt-2 mb-2 text-xs font-semibold text-gray-500">
        Partially Paid Debt Pie Chart
      </h6>
      {/* <div className="flex flex-col items-center mt-2">
        {data.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className="flex items-center text-xs mb-2"
          >
            <div
              className="w-4 h-4 mr-2"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <p>{entry.name}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default PieChartPartialDebt;
