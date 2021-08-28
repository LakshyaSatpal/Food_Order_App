import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [toCheckout, setToCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((cartItem) => (
        <CartItem
          name={cartItem.name}
          key={cartItem.id}
          amount={cartItem.amount}
          price={cartItem.price}
          onRemove={cartItemRemoveHandler.bind(null, cartItem.id)} // bind will send arguments but not execute the function
          onAdd={cartItemAddHandler.bind(null, cartItem)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setToCheckout(true);
  };

  const cancelCheckoutHandler = () => {
    setToCheckout(false);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-http-4d24a-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseClick}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {toCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={cancelCheckoutHandler}
        />
      )}
      {!toCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending Order</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseClick}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClick={props.onCloseClick}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && !didSubmit && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
