export default function Footer() {
  const date = new Date();
  return (
    <footer>
      <p className="copyright-text">
        Copyright &copy; {date.getFullYear()} All Rights Reserved by
        <a href="#">Blackprint</a>.
      </p>
    </footer>
  );
}
