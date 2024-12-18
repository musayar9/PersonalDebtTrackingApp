import { PieChart, Pie, Cell, Tooltip, PieLabelRenderProps } from "recharts";
import { useFetchUserDebt } from "../../../utils/customHooks";
import { useTranslation } from "react-i18next";

const PieChartPartialDebt = () => {
  const { t } = useTranslation();
  const { debt } = useFetchUserDebt();

  const unpaidCount =
    debt?.filter((d) => d.paymentStatus === "Unpaid").length || 0;
  const partialPaidCount =
    debt.filter((d) => d.paymentStatus === "Partially Paid").length || 0;
  const paidCount = debt.filter((d) => d.paymentStatus === "Paid").length || 0;

  // Veriler ve renkler
  const data = [
    { name: `${t("other_debt")}`, value: unpaidCount + paidCount },
    { name: `${t("partially_paid")}`, value: partialPaidCount },
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
    <>
      {partialPaidCount > 0 && (
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
            {t("partially_paid_pie_chart")}
          </h6>
        </div>
      )}
    </>
  );
};

export default PieChartPartialDebt;
