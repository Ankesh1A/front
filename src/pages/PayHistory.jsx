import React, { useEffect, useState } from "react";
import axiosInstance from '../instant/axios';

const PaymentHistory = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      if (aadhaar.length === 12) {
        setLoading(true);
        try {
          const res = await axiosInstance.get(`http://localhost:5000/api/payment/history/${aadhaar}`);
          setPayments(res.data);
        } catch (error) {
          console.error("Error fetching payment history:", error);
          setPayments([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPayments();
  }, [aadhaar]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">🔍 View Payment History</h2>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          maxLength="12"
          placeholder="Enter 12-digit Aadhaar Number"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value.replace(/\D/, ""))}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {aadhaar.length !== 12 && (
          <p className="text-red-500 text-sm mt-2 sm:mt-0">Enter a valid 12-digit Aadhaar number</p>
        )}
      </div>

      {loading ? (
        <p className="text-center text-blue-500">Fetching data...</p>
      ) : payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Transaction ID</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Type</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border">{payment.transactionId}</td>
                  <td className="p-3 border">{payment.date}</td>
                  <td className="p-3 border">₹{payment.amount}</td>
                  <td className="p-3 border">{payment.type}</td>
                  <td
                    className={`p-3 border font-medium ${
                      payment.status === "Successful" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : aadhaar.length === 12 ? (
        <p className="text-center text-gray-500 mt-4">No payment records found.</p>
      ) : null}
    </div>
  );
};

export default PaymentHistory;
