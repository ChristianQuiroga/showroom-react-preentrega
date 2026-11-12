import styles from "./CouponManagement.module.css";
import { useEffect, useState } from "react";
import {
  getCoupons,
  createCoupon,
  deleteCoupon,
} from "../../services/couponService";

export function CouponManagement() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [percentage, setPercentage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadCoupons() {
      try {
        const data = await getCoupons();

        if (active) {
          setCoupons(data);
        }
      } catch (err) {
        console.error("Error al obtener cupones:", err);

        if (active) {
          setError("No se pudieron cargar los cupones.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadCoupons();

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const couponCode = code.trim().toUpperCase();
    const discount = Number(percentage);

    if (!couponCode) {
      alert("Ingresá un código de cupón.");
      return;
    }

    if (!Number.isFinite(discount) || discount <= 0 || discount > 100) {
      alert("El descuento debe ser mayor a 0 y menor o igual a 100.");
      return;
    }

    try {
      setSaving(true);

      const newId = await createCoupon({
        codigo: couponCode,
        porcentaje: discount,
      });

      setCoupons((previous) => [
        ...previous,
        { id: newId, codigo: couponCode, porcentaje: discount },
      ]);

      setCode("");
      setPercentage("");

      alert("Cupón creado correctamente.");
    } catch (error) {
      console.error("Error al crear cupón:", error);
      alert("No se pudo crear el cupón.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que querés eliminar este cupón?",
    );

    if (!confirmed) return;

    try {
      await deleteCoupon(id);

      setCoupons((previous) => previous.filter((coupon) => coupon.id !== id));

      alert("Cupón eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar cupón:", error);
      alert("No se pudo eliminar el cupón.");
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Gestión de cupones</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="couponCode">Código del cupón</label>
          <input
            className={styles.input}
            id="couponCode"
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Ej: VERANO20"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="couponPercentage">Porcentaje de descuento</label>
          <input
            className={styles.input}
            id="couponPercentage"
            type="number"
            min="1"
            max="100"
            step="1"
            value={percentage}
            onChange={(event) => setPercentage(event.target.value)}
            placeholder="Ej: 20"
            required
          />
        </div>

        <button className={styles.submitButton} type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Crear cupón"}
        </button>
      </form>

      <h3 className={styles.title}>Cupones registrados</h3>

      {loading && <p>Cargando cupones...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && coupons.length === 0 && (
        <p>No hay cupones registrados.</p>
      )}

      {!loading && !error && (
        <ul className={styles.list}>
          {coupons.map((coupon) => (
            <li className={styles.listItem} key={coupon.id}>
              <div className={styles.couponDetails}>
                <strong>{coupon.codigo}</strong>
                <span>{coupon.porcentaje}% de descuento</span>
              </div>
              <button
                className={styles.deleteButton}
                type="button"
                onClick={() => handleDelete(coupon.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      
    </section>
  );
}
