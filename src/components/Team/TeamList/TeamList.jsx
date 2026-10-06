import Team from "../Team/Team";
import styles from "./TeamList.module.css";

function TeamList({ teams, mensaje }) {
  return (
    <>
      <h2 className={styles.title}>{mensaje}</h2>
      <div className={styles.container}>
        {teams.map((integrantes) => (
          <Team key={integrantes.id} {...integrantes} />
        ))}
      </div>
    </>
  );
}

export default TeamList;
