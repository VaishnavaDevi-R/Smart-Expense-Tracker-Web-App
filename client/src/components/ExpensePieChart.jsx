import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ExpensePieChart({
  transactions,
}) {
  const expenses =
    transactions.filter(
      (t) => t.type === "expense"
    );

  const categoryTotals = {};

  expenses.forEach((item) => {
    categoryTotals[item.category] =
      (categoryTotals[
        item.category
      ] || 0) + item.amount;
  });

  const data = {
    labels: Object.keys(
      categoryTotals
    ),

    datasets: [
      {
        data: Object.values(
          categoryTotals
        ),
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Expense Categories
      </h2>

      <Pie data={data} />
    </div>
  );
}

export default ExpensePieChart;