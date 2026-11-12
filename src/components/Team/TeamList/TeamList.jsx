import { useState } from "react";
import Team from "../Team/Team";
import styles from "./TeamList.module.css";

function TeamList({ teams, mensaje }) {
  const [emailCopiado, setEmailCopiado] = useState(null);

  const copiarEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopiado(email);
    } catch (error) {
      console.error("Error al copiar el email:", error);
    }
  };

  return (
    <>
      <h2 className={styles.title}>{mensaje}</h2>

      <div className={styles.container}>
        {teams.map((integrante) => (
          <Team
            key={integrante.id}
            {...integrante}
            copiado={emailCopiado === integrante.email}
            onCopiar={() => copiarEmail(integrante.email)}
          />
        ))}
      </div>
    </>
  );
}

export default TeamList;