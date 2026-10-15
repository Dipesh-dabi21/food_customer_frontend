export default function Footer() {
  return (
    <footer>
      <a className="brand" href="#">
        crave<span className="dot">.</span>
      </a>

      <span>Made for the love of good food.</span>

      <span>© {new Date().getFullYear()} Crave Kitchen</span>
    </footer>
  );
}
