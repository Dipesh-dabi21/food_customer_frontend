import { ShoppingBag, UtensilsCrossed } from "lucide-react";

export default function Header({ count, onOpenCart }) {
  return (
    <header className="topbar">
      <a className="brand" href="#">
        <span className="brand-icon">
          <UtensilsCrossed size={21} />
        </span>
        crave<span className="dot">.</span>
      </a>

      <nav>
        <a href="#menu">Menu</a>
        <a href="#why">Our promise</a>
      </nav>

      <button className="cart-btn" onClick={onOpenCart}>
        <ShoppingBag size={18} />
        Cart <span>{count}</span>
      </button>
    </header>
  );
}
