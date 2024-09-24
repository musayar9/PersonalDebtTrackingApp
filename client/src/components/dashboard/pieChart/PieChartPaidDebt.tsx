
import { PieChart, Pie, Cell, Tooltip, PieLabelRenderProps } from "recharts";
import { useFetchUserDebt } from "../../../utils/customHooks";


const PieChartPaidDebt = () => {

const { debt } = useFetchUserDebt();

const unpaidCount = debt?.filter((d) => d.paymentStatus === "Unpaid").length;
const partialPaidCount = debt.filter(
  (d) => d.paymentStatus === "Partially Paid"
).length;
const paidCount = debt.filter((d) => d.paymentStatus === "Paid").length;


  // Veriler ve renkler
  const data = [
    { name: "Other Debt", value: unpaidCount + partialPaidCount },
    { name: "Paid", value: paidCount },
  ];

  const COLORS = ["#fd810eea", "#00C49F"];

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
        fontSize={"12px"}
      >
        {`${(percent! * 100).toFixed(2)}%`}
      </text>
    );
  };

  return (
    <>
      {paidCount > 0 && (
        <div className="col-span-3 flex flex-col items-center">
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              cx={100}
              cy={100}
              labelLine={false}
              label={renderCustomizedLabel}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <h6 className="-mt-2 mb-2 text-xs font-semibold text-gray-500">
            Paid Debt Pie Chart
          </h6>
        </div>
      )}
    </>
  );
};

export default PieChartPaidDebt;
