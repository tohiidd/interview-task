import { useEffect, useRef, useState } from 'react';
import MarketItem from './MarketItem';
import Pagination from '../../components/Pagination';

const MARKETS_PER_PAGE = 12;

function HomePage() {
  const [markets, setMarkets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState('IRT');

  const totalPageCount = useRef(0);

  const marketList = markets.filter((market) => market?.currency2?.code === currentTab);

  const indexOfLastRecipe = currentPage * MARKETS_PER_PAGE;
  const indexOfFirstRecipe = indexOfLastRecipe - MARKETS_PER_PAGE;
  const currentMarkets = marketList.slice(indexOfFirstRecipe, indexOfLastRecipe);
  console.log(currentMarkets);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleTab = (type: 'IRT' | 'USDT') => setCurrentTab(type);

  const fetchMarkets = async () => {
    try {
      const response = await fetch('https://api.bitpin.ir/v1/mkt/markets/').then((res) => res.json());
      setMarkets(response?.results);
      totalPageCount.current = response?.count;
      console.log(response);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  return (
    <div>
      <div className="flex gap-2">
        <button onClick={() => toggleTab('IRT')} className="border-2 rounded-md p-1">
          تومان
        </button>
        <button onClick={() => toggleTab('USDT')} className="border-2 rounded-md p-1">
          تتر
        </button>
      </div>
      <div>
        <div className="flex gap-20 border-b-2">
          <div>نام رمز ارز</div>
          <div>قیمت</div>
          <div>خرید/فروش</div>
        </div>
        {currentMarkets.map((market) => (
          <MarketItem key={market?.id} id={market?.id} title={market?.title_fa} price={market?.price} tradable={market?.tradable} />
        ))}
      </div>
      <div className="w-auto">
        <Pagination perPage={MARKETS_PER_PAGE} totalCount={totalPageCount.current} paginate={paginate} currentPage={currentPage} />
      </div>
    </div>
  );
}

export default HomePage;
