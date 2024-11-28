import { useState, useEffect } from 'react';

const useTransactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (isSubscribed) {
      const ws = new WebSocket('wss://ws.blockchain.info/inv');
      ws.onopen = () => {
        ws.send(JSON.stringify({ op: 'unconfirmed_sub' }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.op === 'utx') {
          const txAmount = data.x.out.reduce((sum: number, output: any) => sum + output.value / 100000000, 0);
          setTransactions((prev) => [...prev, data.x]);
          setTotalAmount((prev) => prev + txAmount);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };

      setSocket(ws);
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [isSubscribed]);

  const startSubscription = () => setIsSubscribed(true);
  const stopSubscription = () => {
    setIsSubscribed(false);
    if (socket) {
      socket.close();
    }
  };
  const resetData = () => {
    setTransactions([]);
    setTotalAmount(0);
  };

  return {
    transactions,
    totalAmount,
    startSubscription,
    stopSubscription,
    resetData,
  };
};

export default useTransactions;
