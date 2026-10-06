import styles from "./Team.module.css";

function Team({ nombre, email, puesto, foto }) {
  return (
    <div className={styles.card}>
      <img src={foto} className={styles.imagen} alt="" />

      <div className={styles.cardTitle}>
        <h3>{nombre}</h3>
      </div>

      <p>{puesto}</p>
      <div className={styles.email}>
        <span>Email:</span>
        <span>{email}</span>
      </div>
    </div>
  );
}

export default Team;
