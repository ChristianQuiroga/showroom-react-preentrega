import { useEffect, useState } from "react";
import Team from "../Team/Team";
import styles from "./TeamList.module.css";

function crearHandleLinkedIn(nombre) {
  const slug = String(nombre ?? "integrante")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${slug || "integrante"}-demo`;
}

function TeamList({ teams, mensaje }) {
  const [datoCopiado, setDatoCopiado] = useState(null);

  useEffect(() => {
    if (!datoCopiado) return undefined;

    const timeoutId = window.setTimeout(() => {
      setDatoCopiado(null);
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [datoCopiado]);

  const copiarDato = async (valor, tipo) => {
    try {
      await navigator.clipboard.writeText(valor);
      setDatoCopiado({ valor, tipo });
    } catch (error) {
      console.error(`Error al copiar ${tipo}:`, error);
    }
  };

  return (
    <>
      <h2 className={styles.title}>{mensaje}</h2>

      <div className={styles.container}>
        {teams.map((integrante) => {
          const linkedinHandle = crearHandleLinkedIn(integrante.nombre);
          const linkedinUrl = `https://www.linkedin.com/in/${linkedinHandle}`;

          return (
            <Team
              key={integrante.id}
              {...integrante}
              linkedinHandle={linkedinHandle}
              emailCopiado={
                datoCopiado?.tipo === "email" &&
                datoCopiado.valor === integrante.email
              }
              linkedinCopiado={
                datoCopiado?.tipo === "linkedin" &&
                datoCopiado.valor === linkedinUrl
              }
              onCopiarEmail={() => copiarDato(integrante.email, "email")}
              onCopiarLinkedIn={() => copiarDato(linkedinUrl, "linkedin")}
            />
          );
        })}
      </div>
    </>
  );
}

export default TeamList;
