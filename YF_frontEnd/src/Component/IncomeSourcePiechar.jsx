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

const IncomeSourcePiechar = () => {
  const { transactions } = userdata();
  const incomeMap = {};

  transactions.forEach(({ Tittle, amount, type }) => {
    if (type === "income") {
      incomeMap[Tittle] = (incomeMap[Tittle] || 0) + Math.abs(amount);
    }
  });

  const incomeData = Object.entries(incomeMap).map(([Tittle, amount]) => ({
    name: Tittle,
    value: amount,
  }));

  return (
    <div>
      <h3>Your Income Source</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={incomeData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#ff6347"
            label
          >
            {incomeData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`hsl(${(index / incomeData.length) * 360}, 70%, 50%)`}
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

export default IncomeSourcePiechar;
