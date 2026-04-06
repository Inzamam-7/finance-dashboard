import Record from "../models/record.models.js";

// Summary (income, expense, balance)
export const getSummary = async () => {
  const result = await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let income = 0, expense = 0;

  result.forEach((r) => {
    if (r._id === "income") income = r.total;
    if (r._id === "expense") expense = r.total;
  });

  return {
    totalIncome: income,
    totalExpense: expense,
    netBalance: income - expense,
  };
};


//  Category-wise totals
export const getCategoryTotals = async () => {
  return await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
  ]);
};


// 🔹 Monthly trends
export const getMonthlyTrends = async () => {
  return await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: { $month: "$date" },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id": 1 } },
  ]);
};