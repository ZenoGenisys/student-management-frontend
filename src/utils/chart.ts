import type { RevenueGraphType } from '../types';

type TransformedChartData = {
  name: string;
  [key: string]: string | number;
};

const monthNames: { [key: string]: string } = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

export const formatRevenueData = (
  data: RevenueGraphType[],
  timeframe: 'monthly' | 'yearly',
): TransformedChartData[] => {
  if (!data) {
    return [];
  }

  const groupedData = data.reduce((acc: { [key: string]: TransformedChartData }, item) => {
    const key = timeframe === 'monthly' ? item.month.substring(5, 7) : item.month.substring(0, 4);
    const name = timeframe === 'monthly' ? monthNames[key] : key;

    if (!acc[key]) {
      acc[key] = { name };
    }

    acc[key][item.center] = ((acc[key][item.center] || 0) as number) + item.amount;

    return acc;
  }, {});

  return Object.values(groupedData).map((item) => ({
    ...item,
    Total: Object.values(item).reduce(
      (sum: number, value) => (typeof value === 'number' ? sum + value : sum),
      0,
    ) as number,
  }));
};
