import { useEffect, useState } from "react";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Cart from "./components/Cart.jsx";
import Order from "./components/Order.jsx";

export default function App() {
  const [cart, setCart] = useState([]);
  const [activePanel, setActivePanel] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    if (!isPanelOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsPanelOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPanelOpen]);

  function openPanel(panel) {
    if (activePanel === panel && isPanelOpen) {
      setIsPanelOpen(false);
      return;
    }

    setActivePanel(panel);
    setIsPanelOpen(true);
  }

  function finishPanelTransition(event) {
    if (
      event.target === event.currentTarget &&
      event.propertyName === "transform" &&
      !isPanelOpen
    ) {
      setActivePanel(null);
    }
  }

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
      <Navbar
        onOpenCart={() => openPanel("cart")}
        onOpenOrder={() => openPanel("order")}
        activePanel={isPanelOpen ? activePanel : null}
      />
      <Home onAddToCart={addToCart} />

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isPanelOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isPanelOpen}
      >
        <button
          type="button"
          aria-label="Close panel"
          onClick={() => setIsPanelOpen(false)}
          className="absolute inset-0 h-full w-full bg-slate-950/40"
        />
        <aside
          id="navigation-panel"
          role="dialog"
          aria-modal={isPanelOpen}
          aria-label={activePanel === "cart" ? "Shopping cart" : "Place order"}
          aria-hidden={!isPanelOpen}
          inert={!isPanelOpen}
          onTransitionEnd={finishPanelTransition}
          className={`absolute right-0 top-0 flex h-dvh w-full max-w-xl flex-col bg-stone-50 shadow-2xl transition-transform duration-300 ease-in-out ${
            isPanelOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-stone-200 bg-white px-5 py-4 sm:px-8">
            <h2 className="text-lg font-semibold text-slate-900">
              {activePanel === "cart" ? "Your cart" : "Place order"}
            </h2>
            <button
              type="button"
              onClick={() => setIsPanelOpen(false)}
              aria-label="Close panel"
              className="rounded-full p-2 text-2xl leading-none text-slate-600 transition hover:bg-stone-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              &times;
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-8">
            {activePanel === "cart" ? (
              <Cart
                cartItems={cart}
                onUpdateQuantity={updateCartQuantity}
                onRemoveItem={removeFromCart}
              />
            ) : (
              <Order cartItems={cart} onPlaceOrder={placeOrder} />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
