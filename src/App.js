import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCartHandler = () => {
    setIsCartOpen(true);
  };

  const closeCartHandler = () => {
    setIsCartOpen(false);
  };
  return (
    <CartProvider>
      <Header onCartClick={openCartHandler} />
      <main>
        <Meals />
      </main>
      {isCartOpen && <Cart onCloseClick={closeCartHandler} />}
    </CartProvider>
  );
}

export default App;
