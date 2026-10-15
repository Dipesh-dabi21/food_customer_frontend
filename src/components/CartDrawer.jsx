import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

export default function CartDrawer({
  open,
  onClose,
  entries,
  count,
  total,
  onAddItem,
  onRemoveItem,
  onCheckout,
}) {
  if (!open) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <aside className="drawer" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <div className="eyebrow">YOUR SELECTION</div>
            <h2>
              Your cart <span>({count})</span>
            </h2>
          </div>

          <button
            className="icon-btn"
            aria-label="Close cart"
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="empty">
            <ShoppingBag size={34} />
            <h3>Your cart is taking a nap.</h3>
            <p>Add something delicious from the menu.</p>

            <button className="primary" onClick={onClose}>
              Explore menu
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {entries.map(({ item, qty }) => (
                <div className="cart-row" key={item._id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-detail">
                    <b>{item.name}</b>
                    <span>{formatCurrency(item.price)}</span>

                    <div className="quantity">
                      <button
                        aria-label={`Remove one ${item.name}`}
                        onClick={() => onRemoveItem(item._id)}
                      >
                        <Minus size={14} />
                      </button>

                      <span>{qty}</span>

                      <button
                        aria-label={`Add one ${item.name}`}
                        onClick={() => onAddItem(item)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <strong>{formatCurrency(item.price * qty)}</strong>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Subtotal</span>
                <b>{formatCurrency(total)}</b>
              </div>

              <div>
                <span>Delivery</span>
                <b className="free">FREE</b>
              </div>

              <div className="grand">
                <span>Total</span>
                <b>{formatCurrency(total)}</b>
              </div>

              <button className="primary full" onClick={onCheckout}>
                Continue to checkout <span>→</span>
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
