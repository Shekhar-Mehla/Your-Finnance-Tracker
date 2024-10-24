import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { userdata } from "../context/ContextApi";

const ExpenseSourcePieChart = () => {
  const { transactions } = userdata();
  const expenseMap = {};

  transactions.forEach(({ Tittle, amount, type }) => {
    if (type === "expense") {
      expenseMap[Tittle] = (expenseMap[Tittle] || 0) + Math.abs(amount);
    }
  });

  const expenseData = Object.entries(expenseMap).map(([Tittle, amount]) => ({
    name: Tittle,
    value: amount,
  }));

  return (
    <div>
      <h3>Expense Sources</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={expenseData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#ff6347"
            label
          >
            {expenseData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`hsl(${(index / expenseData.length) * 360}, 70%, 50%)`}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseSourcePieChart;
