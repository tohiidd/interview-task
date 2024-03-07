import { useEffect, useRef, useState } from 'react';
import MarketItem from '../../components/MarketItem';
import Pagination from '../../components/Pagination';
import Tabs from '../../components/Tabs';

const MARKETS_PER_PAGE = 12;

const TABS = [
  {
    name: 'تومان',
    type: 'IRT',
  },
  {
    name: 'تتر',
    type: 'USDT',
  },
];
function HomePage() {
  const [markets, setMarkets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState('IRT');

  const totalPageCount = useRef(0);

  const marketList = markets.filter((market) => market?.currency2?.code === currentTab);

  const indexOfLastRecipe = currentPage * MARKETS_PER_PAGE;
  const indexOfFirstRecipe = indexOfLastRecipe - MARKETS_PER_PAGE;
  const currentMarkets = marketList.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleTab = (type: 'IRT' | 'USDT') => setCurrentTab(type);

  const fetchMarkets = async () => {
    try {
      const response = await fetch('https://api.bitpin.ir/v1/mkt/markets/').then((res) => res.json());
      setMarkets(response?.results);
      totalPageCount.current = response?.count;
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  return (
    <div>
      <Tabs tabs={TABS} activeTab={currentTab} toggleTab={toggleTab} />
      <div>
        <div className="flex gap-20 border-b-2 border-b-slate-400">
          <div>نام رمز ارز</div>
          <div>قیمت</div>
          <div>خرید/فروش</div>
        </div>
        {currentMarkets.map((market) => (
          <MarketItem key={market?.id} id={market?.id} title={market?.title_fa} price={market?.price} tradable={market?.tradable} />
        ))}
      </div>
      <div className="w-auto">{!!totalPageCount.current && <Pagination perPage={MARKETS_PER_PAGE} totalCount={totalPageCount.current} paginate={paginate} currentPage={currentPage} />}</div>
    </div>
  );
}

export default HomePage;
