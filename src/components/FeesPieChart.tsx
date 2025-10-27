import { Card, CardContent, CardHeader, Typography, Box, useTheme } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  type PieLabelRenderProps,
} from 'recharts';

type Props = {
  data: { name: string; value: number }[];
};

const FeesPieChart = ({ data }: Props) => {
  const theme = useTheme();
  const COLORS = [theme.palette.success.main, theme.palette.warning.main];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: PieLabelRenderProps) => {
    const radius =
      (innerRadius as number) + ((outerRadius as number) - (innerRadius as number)) * 0.5;
    const x = (cx as number) + radius * Math.cos(-(midAngle as number) * RADIAN);
    const y = (cy as number) + radius * Math.sin(-(midAngle as number) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > (cx as number) ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${((percent as number) * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader title={<Typography variant="h5">Fees Overview</Typography>} />
      <CardContent sx={{ borderTop: `1px solid ${theme.palette.divider}`, height: '100%' }}>
        <Box sx={{ height: 350, width: '100%' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeesPieChart;
