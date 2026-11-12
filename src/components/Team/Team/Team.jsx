import styles from "./Team.module.css";

function CopyIcon({ copied }) {
  return copied ? (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4 10 4 4 8-8" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="7" y="6" width="9" height="11" rx="2" />
      <path d="M12 6V4.5A1.5 1.5 0 0 0 10.5 3h-6A1.5 1.5 0 0 0 3 4.5v8A1.5 1.5 0 0 0 4.5 14H7" />
    </svg>
  );
}

function Team({
  nombre,
  email,
  puesto,
  foto,
  linkedinHandle,
  emailCopiado,
  linkedinCopiado,
  onCopiarEmail,
  onCopiarLinkedIn,
}) {
  return (
    <article className={styles.card}>
      <img
        src={foto}
        className={styles.imagen}
        alt={`Fotografía de ${nombre}`}
        loading="lazy"
      />

      <div className={styles.cardTitle}>
        <h3>{nombre}</h3>
      </div>

      <p className={styles.position}>{puesto}</p>

      <div className={styles.contact}>
        <div className={styles.email}>
          <span className={styles.emailIcon} aria-hidden="true">
            <svg viewBox="0 0 20 20">
              <rect x="2.5" y="4" width="15" height="12" rx="2" />
              <path d="m3.5 5 6.5 5 6.5-5" />
            </svg>
          </span>
          <a
            href={`mailto:${email}`}
            className={styles.emailAddress}
            title={email}
          >
            {email}
          </a>
          <button
            type="button"
            onClick={onCopiarEmail}
            className={styles.copyButton}
            aria-label={
              emailCopiado
                ? `Correo de ${nombre} copiado`
                : `Copiar correo de ${nombre}`
            }
            title={emailCopiado ? "Correo copiado" : "Copiar email"}
          >
            <CopyIcon copied={emailCopiado} />
          </button>
        </div>

        <div className={styles.linkedin}>
          <span className={styles.linkedinIcon} aria-hidden="true">
            in
          </span>
          <span
            className={styles.linkedinAddress}
            title={`https://www.linkedin.com/in/${linkedinHandle}`}
          >
            linkedin.com/in/{linkedinHandle}
          </span>
          <button
            type="button"
            onClick={onCopiarLinkedIn}
            className={styles.copyButton}
            aria-label={
              linkedinCopiado
                ? `Perfil de LinkedIn de ${nombre} copiado`
                : `Copiar perfil de LinkedIn de ${nombre}`
            }
            title={linkedinCopiado ? "Perfil copiado" : "Copiar LinkedIn"}
          >
            <CopyIcon copied={linkedinCopiado} />
          </button>
        </div>

        {(emailCopiado || linkedinCopiado) && (
          <small className={styles.copyFeedback} role="status">
            {emailCopiado ? "Email copiado" : "Perfil de LinkedIn copiado"}
          </small>
        )}
      </div>
    </article>
  );
}

export default Team;
