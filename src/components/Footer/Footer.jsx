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
          <p>
            <span>Visítanos</span>
            Thames 1450, Palermo, Ciudad Autónoma de Buenos Aires
          </p>
          <p>
            <span>Escríbenos</span>
            <a href="mailto:hola@casacuero.com">hola@casacuero.com</a>
          </p>
          <p>
            <span>Llámanos</span>
            <a href="tel:+541147821450">+54 11 4782-1450</a>
          </p>
        </address>
        <p className={style.text}>
          &copy; 2026 Casa Cuero. Derechos reservados.
        </p>
      </section>
    </footer>
  );
}

export default Footer;
