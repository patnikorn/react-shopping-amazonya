import { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Pagination from '@material-ui/lab/Pagination';
// Styles
import { Wrapper, StyledButton } from './App.styles';
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;


  return (
    <Wrapper>
       <AppBar style={{backgroundColor: 'Linen'}}>
          <Toolbar>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart 
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Typography variant="h3" style={{fontWeight: "bold", color: "DarkSlateGray"}}>Amazonya</Typography>
      </Toolbar>
    </AppBar>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={6} sm={3}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
      <br></br>
      <Pagination count={10} variant="outlined" style={{ display: 'flex', alignItems: 'center',justifyContent: 'center',}} />
      <div>
        <br></br>
        <hr></hr>
         <p style={{ display: 'flex', alignItems: 'center',justifyContent: 'center',}}>Contect With Us</p>
         <p style={{ display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
           Facebook: X &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Twitter: Y &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Youtube: Z
         </p>
         <p style={{ display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
           Tell: 191 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; E-mail: Google@gmail.com</p>
      </div>
    </Wrapper>
    
  );
};

export default App;
