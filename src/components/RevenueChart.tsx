import { useMemo, useState } from 'react';
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
import {
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from '@mui/material';
import { formatRevenueData } from '../utils/chart';
import type { RevenueGraphType } from '../types';

type Timeframe = 'monthly' | 'yearly';

type Props = {
  revenueData: RevenueGraphType[];
};

const RevenueChart = ({ revenueData }: Props) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('monthly');

  const data = useMemo(
    () => formatRevenueData(revenueData ?? [], timeframe),
    [revenueData, timeframe],
  );
  const centers = useMemo(
    () => (revenueData ? [...new Set(revenueData.map((d) => d.center))] : []),
    [revenueData],
  );

  const handleTimeframeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newTimeframe: string | null,
  ) => {
    if (newTimeframe !== null) {
      setTimeframe(newTimeframe as Timeframe);
    }
  };

  const barColors = ['#ce3de1af', '#82ca9d', '#8884d8', '#ffc658', '#ff8042'];
  const getBarColor = (index: number) => {
    return barColors[index % barColors.length];
  };

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h5">Revenue</Typography>}
        action={
          <ToggleButtonGroup
            value={timeframe}
            exclusive
            onChange={handleTimeframeChange}
            aria-label="timeframe"
            size="small"
            sx={{ background: '#fff' }}
          >
            <ToggleButton value="monthly" aria-label="monthly" sx={{ fontWeight: 'bold' }}>
              Monthly
            </ToggleButton>
            <ToggleButton value="yearly" aria-label="yearly" sx={{ fontWeight: 'bold' }}>
              Yearly
            </ToggleButton>
          </ToggleButtonGroup>
        }
      />
      <CardContent>
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
            {centers.map((center, index) => (
              <Bar key={center} dataKey={center} stackId="a" fill={getBarColor(index)} />
            ))}
            <Bar dataKey="Total" fill="#506EE4" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
