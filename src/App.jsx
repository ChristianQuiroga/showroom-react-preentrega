import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ItemListContainerProductos from "./components/Product/ItemListContainer/ItemListContainerProductos";
import ProductDetail from "./components/Product/ProductDetail/ProductDetail";

import { FormularioContainer } from "./components/FormularioContainer/FormularioContainer";
import TeamListContainer from "./components/Team/TeamListContainer/TeamListContainer";
import CartPage from "./pages/Cart/CartPage";

import Home from "./pages/Home/Home";

function App() {
  return (
    /*<Layout>
      <ItemListContainerProductos />
      <FormularioContainer />
    </Layout>
    */

    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="/productos" element={<ItemListContainerProductos />} />

        <Route path="/producto/:id" element={<ProductDetail />} />

        <Route path="/alta" element={<FormularioContainer />} />

        <Route
          path="/nosotros"
          element={<TeamListContainer Mensaje="Nuestro equipo" />}
        />

        <Route path="/contacto" element={<h1>Contacto</h1>} />

        <Route path="carrito" element={<CartPage />} />

        <Route path="*" element={<h1>Página No econtrada</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
