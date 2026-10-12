import { useEffect, useState } from "react";
import { openStatus } from "../lib/time";

// Met à jour « Ouvert / Fermé » chaque minute, sans recharger la page
export function useOpenStatus() {
  const [status, setStatus] = useState(() => openStatus());
  useEffect(() => {
    const id = setInterval(() => setStatus(openStatus()), 60_000);
    return () => clearInterval(id);
  }, []);
  return status;
}
