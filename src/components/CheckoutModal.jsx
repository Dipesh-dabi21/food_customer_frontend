import { useState } from "react";
import { X } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

const initialCustomer = {
  name: "",
  phone: "",
  address: "",
};

export default function CheckoutModal({
  open,
  onClose,
  total,
  busy,
  error,
  onPlaceOrder,
}) {
  const [customer, setCustomer] = useState(initialCustomer);

  if (!open) return null;

  const updateField = (event) => {
    const { name, value } = event.target;

    setCustomer((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const createdOrder = await onPlaceOrder(event, customer);

    if (createdOrder) {
      setCustomer(initialCustomer);
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <section
        className="checkout modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="drawer-head">
          <div>
            <div className="eyebrow">ALMOST THERE</div>
            <h2>Delivery details</h2>
          </div>

          <button
            className="icon-btn"
            aria-label="Close checkout"
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              name="name"
              autoComplete="name"
              required
              minLength={2}
              value={customer.name}
              onChange={updateField}
              placeholder="Your name"
            />
          </label>

          <label>
            Phone number
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              pattern="[0-9+() -]{8,18}"
              value={customer.phone}
              onChange={updateField}
              placeholder="+91 98765 43210"
            />
          </label>

          <label>
            Delivery address
            <textarea
              name="address"
              autoComplete="street-address"
              required
              minLength={8}
              value={customer.address}
              onChange={updateField}
              placeholder="House / flat, street, area, city"
            />
          </label>

          <div className="checkout-total">
            <span>Order total</span>
            <b>{formatCurrency(total)}</b>
          </div>

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          <button className="primary full" type="submit" disabled={busy}>
            {busy
              ? "Placing order..."
              : `Place order · ${formatCurrency(total)}`}
          </button>
        </form>
      </section>
    </div>
  );
}
