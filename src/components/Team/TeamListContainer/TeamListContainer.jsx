import { useEffect, useState } from "react";
import TeamList from "../TeamList/TeamList";

import styles from "./TeamListContainer.module.css";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

function TeamListContainer() {
  const [team, setTeam] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarTeam = async () => {
      try {
        const equipoRef = collection(db, "equipo");
        const snapshot = await getDocs(equipoRef);
        const datos = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: Number(doc.id),
        }));

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
    return <p>Error al cargar el equipo: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <TeamList teams={team} mensaje={"Nuestro Equipo"} />
    </div>
  );
}

export default TeamListContainer;
