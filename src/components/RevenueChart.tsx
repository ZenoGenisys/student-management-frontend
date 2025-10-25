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
  { name: 'Jan', Revenue: 4000 },
  { name: 'Feb', Revenue: 3000 },
  { name: 'Mar', Revenue: 5000 },
  { name: 'Apr', Revenue: 4500 },
  { name: 'May', Revenue: 6000 },
  { name: 'Jun', Revenue: 5500 },
  { name: 'Jul', Revenue: 6500 },
  { name: 'Aug', Revenue: 7000 },
  { name: 'Sep', Revenue: 6800 },
  { name: 'Oct', Revenue: 7200 },
  { name: 'Nov', Revenue: 7500 },
  { name: 'Dec', Revenue: 8000 },
];

const yearlyData = [
  { name: '2021', Revenue: 50000 },
  { name: '2022', Revenue: 65000 },
  { name: '2023', Revenue: 72000 },
  { name: '2024', Revenue: 80000 },
  { name: '2025', Revenue: 95000 },
];

const RevenueChart = () => {
  const [timeframe, setTimeframe] = useState('monthly');

  const data = timeframe === 'monthly' ? monthlyData : yearlyData;

  const handleTimeframeChange = (
    event: React.MouseEvent<HTMLElement>,
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
            <Bar dataKey="Revenue" fill="#506EE4" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
