import { useEffect, useState } from "react";
import API from "../services/api";

function TransactionList({ refreshTrigger }) {
  const [transactions, setTransactions] =
    useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [refreshTrigger]);

  const fetchTransactions = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await API.get(
        "/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await API.delete(
        `/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Transactions
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="p-3">
                Title
              </th>
              <th className="p-3">
                Amount
              </th>
              <th className="p-3">
                Type
              </th>
              <th className="p-3">
                Category
              </th>
              <th className="p-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(
              (transaction) => (
                <tr
                  key={transaction._id}
                  className="border-b"
                >
                  <td className="p-3">
                    {transaction.title}
                  </td>

                  <td className="p-3">
                    ₹{transaction.amount}
                  </td>

                  <td className="p-3">
                    <span
                      className={
                        transaction.type ===
                        "income"
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {transaction.type}
                    </span>
                  </td>

                  <td className="p-3">
                    {transaction.category}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() =>
                        deleteTransaction(
                          transaction._id
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList;