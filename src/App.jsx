import Layout from "./components/Layout/Layout";
import ItemListContainerProductos from "./components/Product/ItemListContainer/ItemListContainerProductos";

import { FormularioContainer } from "./components/FormularioContainer/FormularioContainer";

function App() {
  return (
    <Layout>
      <ItemListContainerProductos />
      <FormularioContainer />
    </Layout>
  );
}

export default App;
