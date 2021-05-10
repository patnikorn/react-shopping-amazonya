import CartItem from '../CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h3>Total before discount: ${calculateTotal(cartItems).toFixed(2)}</h3>
      <h3>Total discount: ${calculateTotal(cartItems).toFixed(2)}</h3>
      <h3>Total: ${calculateTotal(cartItems).toFixed(2)}</h3>
      <h3 style={{ display: 'flex', alignItems: 'center',justifyContent: 'center',}}>Check Out</h3>
    </Wrapper>
  );
};

export default Cart;
