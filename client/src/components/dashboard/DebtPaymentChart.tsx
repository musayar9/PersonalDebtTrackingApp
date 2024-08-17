
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useGetPaymentStatus } from "../../utils/customHooks";
const DebtPaymentChart = () => {
const unpaid = useGetPaymentStatus({paymentStatus:"Unpaid"}).groupDebt.length
const partiallyPaid = useGetPaymentStatus({ paymentStatus: "Partially Paid" })
  .groupDebt.length;
const paid = useGetPaymentStatus({ paymentStatus: "Paid" }).groupDebt.length


const data = [
  { name: "Unpaid", value: unpaid },
  { name: "Partially Paid", value: partiallyPaid },
  { name: "Paid", value: paid },
];
const COLORS = ["#f73c3c", "#edff28", "#00C49F"];
  return (
    <ResponsiveContainer width="75%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DebtPaymentChart