function OrderItem({ value, price, remain, time, matchAmount }: any) {
  return (
    <div className="flex gap-4">
      <div>{`قیمت: ${price}`}</div>
      {value && <div>{`مقدار: ${value}`}</div>}
      {remain && <div>{`باقی مانده: ${remain}`}</div>}
      {time && <div>{`زمان: ${time}`}</div>}
      {matchAmount && <div>{`مقدار مطابق: ${matchAmount}`}</div>}
    </div>
  );
}

export default OrderItem;
