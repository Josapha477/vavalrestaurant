# Vaval : site de restaurant (React + Vite + Tailwind)

Démo d'un restaurant fictif de Jacmel. Aucun backend, aucun paiement en ligne :
la commande et la réservation s'envoient par WhatsApp.

## Commandes

```bash
npm install        # Node 18 ou plus récent
npm run dev        # http://localhost:5173
npm run build      # site final dans /dist
npm run preview    # tester le site généré
```

## Ce qui fonctionne vraiment

- **Ouvert / Fermé** calculé en direct à partir des horaires (fuseau d'Haïti, mis à jour chaque minute).
- **Plat du jour** qui change automatiquement selon le jour de la semaine.
- **Menu** : recherche (sans accents), filtres par catégorie, végétarien et piquant.
- **Ma commande** : quantités, sous-total, livraison ou à emporter. Elle est mémorisée sur l'appareil
  (localStorage) et envoyée à WhatsApp sous forme de message prêt à envoyer.
- **Réservation** : les heures proposées dépendent du jour choisi (jour fermé, créneaux déjà passés).
  La demande part sur WhatsApp ; elle n'est confirmée que quand le restaurant répond.

## Adapter le site à un vrai client (checklist)

1. `src/data/site.js` : nom, numéro WhatsApp (format `509XXXXXXXX`), adresse, horaires, services.
2. `src/data/menu.js` : catégories, plats, prix, tags, plat du jour de chaque jour.
3. `src/index.css` (`@theme`) : couleurs et polices.
4. Photos : mettez les fichiers dans `public/images/` et ajoutez `image: "/images/griot.jpg"`
   au plat. La photo remplace le dessin.
5. `index.html` : titre et description.
6. Supprimez la mention « site de démonstration » dans `src/components/Footer.jsx`.
7. Testez : une commande, une réservation, le bouton WhatsApp, sur un vrai téléphone.

## Architecture

```
src/
├── App.jsx, main.jsx, index.css
├── data/       site.js (infos, horaires)  ·  menu.js (plats, plat du jour)
├── lib/        format.js · time.js (horaires, créneaux) · whatsapp.js · storage.js
├── context/    CartContext.jsx (état de la commande, partagé par tous les composants)
├── hooks/      useOpenStatus.js
└── components/ Header · Hero · DailySpecial · MenuSection · DishRow · DishModal
                CartDrawer · CartBar · Reservation · Info · Footer
                Button · Tags · QuantityStepper · DishVisual
```
