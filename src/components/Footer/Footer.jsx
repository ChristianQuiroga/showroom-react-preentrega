import style from "./Footer.module.css";
import TeamListContainer from "../Team/TeamListContainer/TeamListContainer";

function Footer() {
  return (
    <footer className={style.footer}>
      <TeamListContainer />

      <section className={style.company} aria-labelledby="company-title">
        <h2 id="company-title">Casa Cuero</h2>
        <p>Diseño y confección de prendas de cuero.</p>
        <address>
          <span>Thames 1450, Palermo, Ciudad Autónoma de Buenos Aires</span>
          <a href="mailto:hola@casacuero.com">hola@casacuero.com</a>
          <a href="tel:+541147821450">+54 11 4782-1450</a>
        </address>
        <p className={style.text}>
          &copy; 2026 Casa Cuero. Derechos reservados.
        </p>
      </section>
    </footer>
  );
}

export default Footer;
