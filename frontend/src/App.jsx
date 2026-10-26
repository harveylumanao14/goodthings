import { useState } from "react";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Cart from "./components/Cart.jsx";
import Order from "./components/Order.jsx";

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product, quantity) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...currentCart, { ...product, quantity }];
    });
  }

  function updateCartQuantity(productId, change) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );
  }

  function placeOrder(orderDetails) {
    const orderPayload = {
      ...orderDetails,
      items: cart,
      total: cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
      createdAt: new Date().toISOString(),
    };

    console.log("Order placed:", orderPayload);
    setCart([]);
    return true;
  }

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <Navbar />
      <Home onAddToCart={addToCart} />

      <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Cart
          cartItems={cart}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
        />
        <Order cartItems={cart} onPlaceOrder={placeOrder} />
      </div>
    </div>
  );
}
