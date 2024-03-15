import React, { useEffect, useRef, useState } from "react";
import classes from "./cart.module.scss";
import { RootState } from "../../redux/store/store";
import { Button } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice/cartSlice";

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);
  const [countSum, setCountSumm] = useState<number>(0);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [savedSum, setSavedSum] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const { selectedProduct } = useSelector(
    (state: RootState) => state.productInfo
  );

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: React.SetStateAction<number>) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const newPrice = selectedProduct.price * selectedOption;
    setCountSumm(newPrice);

    const newTotalPrice = newPrice + 10;
    setTotalSum(newTotalPrice);

    let newSavedSum = selectedProduct.price_previous;

    if (newSavedSum == null) {
      setSavedSum(0);
    } else {
      newSavedSum =
        newSavedSum * selectedOption - selectedProduct.price * selectedOption;
      setSavedSum(newSavedSum);
    }
  }, [selectedProduct, selectedOption]);

  const handleAddToCart = (selectedProduct: any) => {
    const { _id, name, price, img } = selectedProduct;
    const productToAdd = { _id, name, price, img };

    const subtotal = selectedProduct.price * selectedOption;
    dispatch(
      addToCart({
        productToAdd,
        selectedOption,
        subtotal,
      })
    );
  };

  return (
    <div className={classes.cart_container}>
      <div className={classes.cart_info}>
        <h3>Quantity:</h3>

        <div className={classes.custom_dropdown} ref={dropdownRef}>
          <div
            className={classes.selected_option}
            onClick={handleDropdownClick}
          >
            {selectedOption}
            <div className={classes.arrow}></div>
          </div>
          <div
            className={`${classes.options} ${
              isOpen ? classes.display_options : ""
            }`}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((option) => {
              return (
                <div
                  key={option}
                  className={classes.option}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.subtotal}>
          <span>subtotal</span>
          <span>${countSum}.00</span>
        </div>
        <div className={classes.shipping}>
          <span>Shipping</span>
          <span>$10.00</span>
        </div>
        <div className={classes.total}>
          <span>Total</span>
          <span>${totalSum}.00</span>
        </div>
        <div className={classes.saved}>
          <span>You Saved</span>
          <span>-${savedSum}.00</span>
        </div>
        <div className={classes.button}>
          <Button
            backgroundButton="#3598cc"
            color="#ffffff"
            padding="1rem 0.8rem"
            hover="blue"
            buttonFunction={() => handleAddToCart(selectedProduct)}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
