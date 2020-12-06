import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Cart from "./Cart";

const Oink = ({ user }) => {
  const [isCart, setIsCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(1.5),
    },
    cart: {
      height: 450,
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    chrome.tabs.query({ active: true }, function (tabs) {
      var tab = tabs[0];
      if (tab.title.includes("Shopping Cart")) {
        setIsCart(true);
        const tempProduct = [];
        // get prices
        chrome.tabs.executeScript(
          tab.id,
          {
            code:
              "[...document.querySelectorAll('div[data-name=\"Active Items\"]>div>div>div>div>p>span.sc-product-price')].map((x, index)=>this[index]=parseFloat(x.textContent.replace(/[^\\d.-]/g, '')))",
          },
          (result) => {
            result[0].map((item) => {
              let obj = {};
              obj["price"] = item;
              tempProduct.push(obj);
            });
          }
        );
        // get names
        chrome.tabs.executeScript(
          tab.id,
          {
            code:
              "[...document.querySelectorAll('div[data-name=\"Active Items\"]>div>div>div>div>div>div>div>ul>li>span>a>span.sc-product-title')].map((x, index)=>this[index]=x.textContent.trim())",
          },
          (result) => {
            result[0].map((item, index) => {
              tempProduct[index].name = item;
            });
            setProducts(tempProduct);
          }
        );
        // get total price
        chrome.tabs.executeScript(
          tab.id,
          {
            code:
              "[...document.querySelectorAll('span>span.sc-price')].map((x, index)=>this[index]=parseFloat(x.textContent.replace(/[^\\d.-]/g, '')))",
          },
          (totalPrice) => {
            setTotalPrice(totalPrice[0][0]);
          }
        );
      }
    });
  }, []);

  return (
    <div className={isCart ? classes.cart : classes.root}>
      {isCart ? (
        <Cart user={user} items={products} totalPrice={totalPrice} />
      ) : (
        <div>
          <h1 style={{ color: "#FF8FB3" }}>User is authenticated</h1>
          <div>PLEASE NAVIGATE TO AMAZON CART</div>
          <a target="_blank" href="https://oink-dashboard.herokuapp.com/">
            <p style={{ color: "#FF8FB3" }}>Go to Dashboard</p>
          </a>
        </div>
      )}
    </div>
  );
};

export default Oink;
