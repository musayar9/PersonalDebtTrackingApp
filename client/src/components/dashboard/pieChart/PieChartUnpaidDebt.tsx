import { PieChart, Pie, Cell, Tooltip, PieLabelRenderProps } from "recharts";
import { useFetchUserDebt } from "../../../utils/customHooks";
import { useTranslation } from "react-i18next";

const PieChartUnpaidDebt = () => {
  const { t } = useTranslation();
  const { debt } = useFetchUserDebt();

  const unpaidCount = debt?.filter((d) => d.paymentStatus === "Unpaid").length;
  const partialPaidCount = debt.filter(
    (d) => d.paymentStatus === "Partially Paid"
  ).length;
  const paidCount = debt.filter((d) => d.paymentStatus === "Paid").length;

  const data = [
    { name: `${t("other_debt")}`, value: partialPaidCount + paidCount },
    { name:`${t("unpaid")}`, value: unpaidCount },
  ];

  const COLORS = ["#fd810eea", "#dd1414"];

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
        fontSize="12px"
      >
        {`${(percent! * 100).toFixed(2)}%`}
      </text>
    );
  };

  return (
    <>
      {unpaidCount > 0 && (
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
            {t("unpaid_pie_chart")}
          </h6>
        </div>
      )}
    </>
  );
};

export default PieChartUnpaidDebt;
