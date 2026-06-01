import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    totalTransactions: 0,
  });

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        "/dashboard/summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshDashboard = () => {
    fetchSummary();
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Smart Expense Tracker Dashboard
        </h1>

        {/* Transaction Form */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <TransactionForm refresh={refreshDashboard} />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">
              Total Income
            </h3>

            <p className="text-3xl font-bold mt-2">
              ₹{summary.totalIncome}
            </p>
          </div>

          <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">
              Total Expense
            </h3>

            <p className="text-3xl font-bold mt-2">
              ₹{summary.totalExpense}
            </p>
          </div>

          <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">
              Balance
            </h3>

            <p className="text-3xl font-bold mt-2">
              ₹{summary.balance}
            </p>
          </div>

          <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">
              Transactions
            </h3>

            <p className="text-3xl font-bold mt-2">
              {summary.totalTransactions}
            </p>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <TransactionList
            refreshTrigger={refreshTrigger}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;