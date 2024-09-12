// src/components/UserGrowthChart.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', users: 1200 },
  { name: 'Feb', users: 2100 },
  { name: 'Mar', users: 800 },
  { name: 'Apr', users: 1600 },
  { name: 'May', users: 1700 },
];

const UserGrowthChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="users" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UserGrowthChart;
