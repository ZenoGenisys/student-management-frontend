export type DashboardSummaryType = {
  total: number;
  inactive: number;
  active: number;
};

export type DashboardSummary = {
  fees: {
    totalIncome: number;
    currentMonthIncome: number;
  };
  student: DashboardSummaryType;
  staff: DashboardSummaryType;
};
