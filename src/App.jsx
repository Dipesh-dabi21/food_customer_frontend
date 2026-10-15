import { useState } from "react";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";
import PromiseSection from "./components/PromiseSection";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import OrderTrackingModal from "./components/OrderTrackingModal";

import { useMenu } from "./hooks/useMenu";
import { useCart } from "./hooks/useCart";
import { useOrder } from "./hooks/useOrder";

export default function App() {
  const [showCart, setShowCart] = useState(false);

  const { menu, loading, menuError } = useMenu();

  const { cart, entries, total, count, addItem, removeItem, clearCart } =
    useCart();

  const {
    order,
    busy,
    error,
    trackingError,
    checkout,
    setCheckout,
    placeOrder,
    dismissOrder,
  } = useOrder({ clearCart });

  const handlePlaceOrder = (event, customer) =>
    placeOrder(event, customer, entries);

  const handleCheckout = () => {
    setShowCart(false);
    setCheckout(true);
  };

  return (
    <div className="app">
      <Header count={count} onOpenCart={() => setShowCart(true)} />

      <main>
        <HeroSection />

        <MenuSection
          menu={menu}
          cart={cart}
          onAddItem={addItem}
          loading={loading}
          menuError={menuError}
        />

        <PromiseSection />
        <Footer />
      </main>

      <CartDrawer
        open={showCart}
        onClose={() => setShowCart(false)}
        entries={entries}
        count={count}
        total={total}
        onAddItem={addItem}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        open={checkout}
        onClose={() => setCheckout(false)}
        total={total}
        busy={busy}
        error={error}
        onPlaceOrder={handlePlaceOrder}
      />

      <OrderTrackingModal
        order={order}
        trackingError={trackingError}
        onDismiss={dismissOrder}
      />
    </div>
  );
}
