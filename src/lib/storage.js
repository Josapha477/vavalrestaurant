// localStorage peut être indisponible (navigation privée, stockage plein) :
// on protège chaque accès pour que le site continue de fonctionner.
export function loadJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* sans importance : la commande reste en mémoire pour la session */
  }
}
