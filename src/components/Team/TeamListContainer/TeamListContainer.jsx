import { useEffect, useState } from "react";
import TeamList from "../TeamList/TeamList";

import styles from "./TeamListContainer.module.css";

function TeamListContainer() {
  const [team, setTeam] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarTeam = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const resp = await fetch("/data/nosotros.json");

        if (!resp.ok) {
          throw new Error("No se puede cargar la lista de Equipo");
        }
        const tipoContenido = resp.headers.get("content-type");

        if (!tipoContenido?.includes("application/json")) {
          throw new Error("La respuesta recibida no es un archivo JSON válida");
        }

        const datos = await resp.json();
        setTeam(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    cargarTeam();
  }, []);

  if (cargando) {
    return <p>Cargando Equipo, por favor espere...</p>;
  }
  if (error) {
    return <p>Error: </p>;
  }

  return (
    <div className={styles.container}>
      <TeamList teams={team} mensaje={"Nuestro Equipo"} />
    </div>
  );
}

export default TeamListContainer;
