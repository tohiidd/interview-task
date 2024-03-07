import { useNavigate } from 'react-router-dom';

function MarketItem({ id, title, price, tradable }: any) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-8 py-4 cursor-pointer" onClick={() => navigate(`/coin/${id}`)}>
      <div>{title}</div>
      <div>{`${price} تومان`}</div>
      <div>{tradable && 'معامله'}</div>
    </div>
  );
}
export default MarketItem;
