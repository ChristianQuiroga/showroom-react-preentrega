import styles from "./Team.module.css";

function Team({ nombre, email, puesto, foto, copiado, onCopiar }) {
  return (
    <div className={styles.card}>
      <img
        src={foto}
        className={styles.imagen}
        alt={`Fotografía de ${nombre}`}
      />

      <div className={styles.cardTitle}>
        <h3>{nombre}</h3>
      </div>

      <p>{puesto}</p>

      <div className={styles.email}>
        <span>{email}</span>

        <button
          type="button"
          onClick={onCopiar}
          className={styles.copyButton}
          aria-label={`Copiar correo de ${nombre}`}
          title="Copiar email"
        >
          {copiado ? "✓" : "⧉"}
        </button>
      </div>

      {copiado && <small role="status">¡Email copiado!</small>}
    </div>
  );
}

export default Team;