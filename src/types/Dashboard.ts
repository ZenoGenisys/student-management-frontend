export type DashboardSummaryType = {
  total: number;
  inactive: number;
  active: number;
};

export type DashboardSummary = {
  fees: {
    total: number;
    pending: number;
    collected: number;
  };
  income: {
    total: number;
    month: number;
    year: number;
  };
  student: DashboardSummaryType;
  staff: DashboardSummaryType;
};

export type FeesPending = {
  studentId: number;
  name: string;
  totalAmount: number;
  outstandingAmount: number;
};

export type RevenueGraphType = {
  month: string;
  center: string;
  amount: number;
};

export type RevenueGraphResponse = {
  data: RevenueGraphType[];
};
