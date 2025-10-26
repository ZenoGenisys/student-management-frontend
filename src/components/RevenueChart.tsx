import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ToggleButton, ToggleButtonGroup, Card, CardContent, Typography } from '@mui/material';

const monthlyData = [
  { name: 'Jan', Puliyur: 2500, Thanthonimalai: 1500, Total: 4000 },
  { name: 'Feb', Puliyur: 1800, Thanthonimalai: 1200, Total: 3000 },
  { name: 'Mar', Puliyur: 3000, Thanthonimalai: 2000, Total: 5000 },
  { name: 'Apr', Puliyur: 2800, Thanthonimalai: 1700, Total: 4500 },
  { name: 'May', Puliyur: 3500, Thanthonimalai: 2500, Total: 6000 },
  { name: 'Jun', Puliyur: 3200, Thanthonimalai: 2300, Total: 5500 },
  { name: 'Jul', Puliyur: 4000, Thanthonimalai: 2500, Total: 6500 },
  { name: 'Aug', Puliyur: 4200, Thanthonimalai: 2800, Total: 7000 },
  { name: 'Sep', Puliyur: 4100, Thanthonimalai: 2700, Total: 6800 },
  { name: 'Oct', Puliyur: 4500, Thanthonimalai: 2700, Total: 7200 },
  { name: 'Nov', Puliyur: 4800, Thanthonimalai: 2700, Total: 7500 },
  { name: 'Dec', Puliyur: 5000, Thanthonimalai: 3000, Total: 8000 },
];

const yearlyData = [
  { name: '2021', Puliyur: 30000, Thanthonimalai: 20000, Total: 50000 },
  { name: '2022', Puliyur: 38000, Thanthonimalai: 27000, Total: 65000 },
  { name: '2023', Puliyur: 42000, Thanthonimalai: 30000, Total: 72000 },
  { name: '2024', Puliyur: 45000, Thanthonimalai: 35000, Total: 80000 },
  { name: '2025', Puliyur: 55000, Thanthonimalai: 40000, Total: 95000 },
];

const RevenueChart = () => {
  const [timeframe, setTimeframe] = useState('monthly');

  const data = timeframe === 'monthly' ? monthlyData : yearlyData;

  const handleTimeframeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newTimeframe: string | null,
  ) => {
    if (newTimeframe !== null) {
      setTimeframe(newTimeframe);
    }
  };

  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            Revenue
          </Typography>
          <ToggleButtonGroup
            value={timeframe}
            exclusive
            onChange={handleTimeframeChange}
            aria-label="timeframe"
          >
            <ToggleButton value="monthly" aria-label="monthly">
              Monthly
            </ToggleButton>
            <ToggleButton value="yearly" aria-label="yearly">
              Yearly
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Puliyur" fill="#ce3de1af" />
            <Bar dataKey="Thanthonimalai" fill="#82ca9d" />
            <Bar dataKey="Total" fill="#506EE4" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
