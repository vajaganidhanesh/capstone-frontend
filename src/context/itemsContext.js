import { createContext, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  let loginDetails = useRef(JSON.parse(localStorage.getItem("login_details")));

  const allitems = () => {
    fetch("http://localhost:8000/items/allitems", {
      headers: {
        authorization: `Bearer ${loginDetails.current.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if ((data.success = true)) {
          setItems(data.items);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function addToCart(product) {
    let itemdata = { ...product };
    let cartItem = {
      cartItems: {
        item: itemdata._id,
        quantity: itemdata.quantity,
        price: itemdata.price,
        restaurant: itemdata.restaurant._id,
      },
    };

    console.log(cartItem);

    fetch(
      `http://localhost:8000/items/addtocart/${loginDetails.current.userid}`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${loginDetails.current.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCartCount(data.cart.cartItems.length);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <ItemsContext.Provider value={{ cartCount,items, allitems, addToCart }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;
