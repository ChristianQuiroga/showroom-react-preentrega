import { db } from "../firebase/config";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

const couponsRef = collection(db, "cupones");

// CREATE
export async function createCoupon(coupon) {
  const docRef = await addDoc(couponsRef, coupon);
  return docRef.id;
}

// READ
export async function getCoupons() {
  const snapshot = await getDocs(couponsRef);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));
}

// DELETE
export async function deleteCoupon(id) {
  const couponRef = doc(db, "cupones", id);
  await deleteDoc(couponRef);
}