import { useState } from "react";
import api from "../api/axios";

export default function usePiAuth() {
  const [user, setUser] = useState(null);

  const login = async () => {
    try {
      const pi = window.Pi;
      if (!pi) throw new Error("Pi SDK not found");

      const scopes = ["username", "payments"];
      const authResult = await pi.authenticate(scopes, (payment) => {
        console.log("Found incomplete payment:", payment);
      });

      const res = await api.post("/auth/login", { pi_signed_message: authResult });
      setUser(res.data.user);
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  return { user, login };
}
