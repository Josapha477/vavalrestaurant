import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DailySpecial from "./components/DailySpecial";
import MenuSection from "./components/MenuSection";
import Reservation from "./components/Reservation";
import Info from "./components/Info";
import Footer from "./components/Footer";
import DishModal from "./components/DishModal";
import CartDrawer from "./components/CartDrawer";
import CartBar from "./components/CartBar";

export default function App() {
  // Le plat ouvert dans la fenêtre de détail (null = fermée)
  const [dish, setDish] = useState(null);

  return (
    <CartProvider>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Aller au contenu
      </a>
      <Header />
      <main id="contenu">
        <Hero />
        <DailySpecial onOpenDish={setDish} />
        <MenuSection onOpenDish={setDish} />
        <Reservation />
        <Info />
      </main>
      <Footer />

      <DishModal dish={dish} onClose={() => setDish(null)} />
      <CartDrawer />
      <CartBar />
    </CartProvider>
  );
}
