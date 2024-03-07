import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tabs from '../../components/Tabs';
import OrderItem from '../../components/OrderItem';

const TABS = [
  {
    name: 'خرید',
    type: 'buy',
  },
  {
    name: 'فروش',
    type: 'sell',
  },
  {
    name: 'معاملات',
    type: 'trades',
  },
];
function CoinPage() {
  const [orders, setOrders] = useState([]);
  const [currentTab, setCurrentTab] = useState('buy');
  let { id } = useParams();

  const ordersList = orders.slice(0, 10);
  let remainSum = 0;
  let valueSum = 0;
  if (currentTab !== 'trades') {
    remainSum = ordersList.reduce((prevVal, currVal) => {
      return prevVal + currVal?.remain;
    }, 0);
    valueSum = ordersList.reduce((prevVal, currVal) => {
      return prevVal + currVal?.value;
    }, 0);
  }

  const toggleTab = (type: 'buy' | 'sell' | 'trades') => setCurrentTab(type);

  const fetchOrders = async () => {
    try {
      const url = `https://api.bitpin.org/v2/mth/${currentTab === 'trades' ? `matches/${id}` : `actives/${id}/?type=${currentTab}`}`;
      const response = await fetch(url).then((res) => res.json());

      setOrders(response?.orders);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentTab]);

  return (
    <div>
      <Tabs tabs={TABS} activeTab={currentTab} toggleTab={toggleTab} />
      <div>
        {ordersList.map((order) => (
          <OrderItem value={order?.value} price={order?.price} remain={order?.remain} time={order?.time} matchAmount={order?.match_amount} />
        ))}
        {currentTab !== 'trades' && (
          <div>
            <div>{`مجموع مقدار ${valueSum}`}</div>
            <div>{`مجموع باقی مانده ${remainSum}`}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoinPage;
