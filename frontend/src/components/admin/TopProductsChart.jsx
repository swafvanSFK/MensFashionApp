// src/components/TopProductsChart.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Product A', sales: 2400 },
  { name: 'Product B', sales: 1398 },
  { name: 'Product C', sales: 9800 },
  { name: 'Product D', sales: 3908 },
  { name: 'Product E', sales: 4800 },
];

const TopProductsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopProductsChart;
