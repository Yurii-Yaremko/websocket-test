import React from 'react';
import useTransactions from '../../hooks/useTransactions';

const Transactions: React.FC = () => {
  const { 
    transactions, 
    totalAmount, 
    startSubscription, 
    stopSubscription, 
    resetData 
  } = useTransactions();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Unconfirmed Bitcoin Transactions</h1>

      <div className="mb-4">
        <p><strong>Total Amount:</strong> {totalAmount} BTC</p>
      </div>

      <div className="mb-4">
        <button onClick={startSubscription} className="bg-blue-500 text-white p-2 rounded mr-2">
          Запуск
        </button>
        <button onClick={stopSubscription} className="bg-gray-500 text-white p-2 rounded mr-2">
          Зупинка
        </button>
        <button onClick={resetData} className="bg-red-500 text-white p-2 rounded">
          Скинути
        </button>
      </div>

      <div className="overflow-y-scroll max-h-96">
        <ul>
          {transactions.map((tx: any, index: number) => (
            <li key={index} className="mb-2 p-2 border border-gray-300 rounded-md">
              <p><strong>Transaction ID:</strong> {tx.hash}</p>
              <p>
                <strong>Amount:</strong>{' '}
                {tx.out.reduce((sum: number, output: any) => sum + output.value / 100000000, 0)} BTC
              </p>
              <p><strong>Time:</strong> {new Date(tx.time * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;
