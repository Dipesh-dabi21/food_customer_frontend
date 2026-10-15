import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

export default function MenuSection({
  menu,
  cart,
  onAddItem,
  loading,
  menuError,
}) {
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(menu.map((item) => item.category))],
    [menu],
  );

  const filteredMenu = useMemo(
    () =>
      category === "All"
        ? menu
        : menu.filter((item) => item.category === category),
    [category, menu],
  );

  return (
    <section className="menu-section" id="menu">
      <div className="section-heading">
        <div>
          <div className="eyebrow">THE GOOD STUFF</div>
          <h2>
            What are you <em>craving?</em>
          </h2>
        </div>
        <p>Comfort food classics, with a little extra love.</p>
      </div>

      {menuError && (
        <p className="error" role="status">
          {menuError}
        </p>
      )}

      {loading && <p>Loading menu...</p>}

      <div className="filters">
        {categories.map((itemCategory) => (
          <button
            key={itemCategory}
            className={category === itemCategory ? "filter active" : "filter"}
            onClick={() => setCategory(itemCategory)}
          >
            {itemCategory}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredMenu.map((item, index) => (
          <article className="food-card" key={item._id}>
            <div className="food-image">
              <img src={item.image} alt={item.name} loading="lazy" />

              <span className="food-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <button
                aria-label={`Add ${item.name}`}
                className="add-btn"
                onClick={() => onAddItem(item)}
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="food-info">
              <div className="food-category">{item.category}</div>

              <h3>{item.name}</h3>
              <p>{item.description}</p>

              <div className="food-bottom">
                <strong>{formatCurrency(item.price)}</strong>

                {cart[item._id] && (
                  <span className="in-cart">{cart[item._id].qty} in cart</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {!loading && filteredMenu.length === 0 && (
        <p>No menu items found in this category.</p>
      )}
    </section>
  );
}
