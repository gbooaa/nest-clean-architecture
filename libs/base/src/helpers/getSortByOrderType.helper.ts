import { OrderTypes } from '../enums/app/OrderTypes';

export const getSortByOrderType = (
  _orderType?: OrderTypes,
  _default: OrderTypes = OrderTypes.asc,
) => {
  const orderType = _orderType || _default;

  if (orderType === OrderTypes.asc) {
    return 1;
  } else {
    return -1;
  }
};
