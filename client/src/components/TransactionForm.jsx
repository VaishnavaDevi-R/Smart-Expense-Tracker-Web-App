import { useState } from "react";
import API from "../services/api";

function TransactionForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/transactions",
        {
          title,
          amount,
          type,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setAmount("");
      setCategory("");

      refresh();

      alert("Transaction Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">
        Add Transaction
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Title"
          className="border p-3 rounded-lg"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
        />

        <input
          type="number"
          placeholder="Amount"
          className="border p-3 rounded-lg"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          required
        />

        <select
          className="border p-3 rounded-lg"
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <option value="income">
            Income
          </option>
          <option value="expense">
            Expense
          </option>
        </select>

        <input
          type="text"
          placeholder="Category"
          className="border p-3 rounded-lg"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          required
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;