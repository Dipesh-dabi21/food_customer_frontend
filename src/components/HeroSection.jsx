export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">
          <span /> FRESHLY MADE, JUST FOR YOU
        </div>

        <h1>
          Good food.
          <br />
          <em>Great mood.</em>
        </h1>

        <p>
          Your favourites, made fresh and delivered with care. A little joy in
          every bite.
        </p>

        <a className="primary" href="#menu">
          Explore menu <span>↗</span>
        </a>

        <div className="hero-meta">
          <div>
            <strong>30 min</strong>
            <small>Average delivery</small>
          </div>
          <div>
            <strong>Fresh daily</strong>
            <small>Made to order</small>
          </div>
        </div>
      </div>

      <div className="hero-art">
        <div className="hero-orbit" />

        <img
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200"
          alt="Fresh pizza"
        />

        <div className="floating-note">
          <span>✦</span>
          <div>
            <b>Made with love</b>
            <small>Every single order</small>
          </div>
        </div>

        <div className="hero-sticker">
          GOOD
          <br />
          MOOD
          <br />
          FOOD
        </div>
      </div>
    </section>
  );
}
