import { selector } from 'recoil';
import { cartItemsState, selectedCartIdListState } from '../atoms/cartAtom';
import { orderListState } from './orderSelector';

export const priceSummaryState = selector({
  key: 'priceSummaryState',
  get: ({ get }) => {
    const selectedCartItems = get(selectedCartIdListState);
    const cartItems = get(cartItemsState);

    const totalProductPrice = selectedCartItems.reduce(
      (acc, selectedCartItemId) => {
        const product = cartItems.find(
          (cartProduct) => cartProduct.id === selectedCartItemId
        );

        return (acc +=
          Number(product?.quantity) * Number(product?.product.price));
      },
      0
    );

    const deliveryPrice = selectedCartItems.length > 0 ? 3000 : 0;

    const totalPrice = totalProductPrice + deliveryPrice;

    const pointToAdd = totalPrice / 10;

    return { totalProductPrice, deliveryPrice, totalPrice, pointToAdd };
  },
});
