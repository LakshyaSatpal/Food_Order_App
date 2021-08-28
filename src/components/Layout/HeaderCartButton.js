import React, { useContext, useState, useEffect } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const [btnIsBumped, setBtnIsBumped] = useState(false);
  const numberOfCartItems = ctx.items.reduce((acc, current) => {
    // acc is accumulator value which persists after every iteration on each array object
    // current will be array element
    return acc + current.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsBumped ? classes.bump : ""}`;
  useEffect(() => {
    if (ctx.items.length === 0) return;

    setBtnIsBumped(true);
    const timer = setTimeout(() => {
      setBtnIsBumped(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [ctx.items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
