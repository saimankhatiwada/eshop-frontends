import { Route, Routes } from "react-router-dom";
import { Footer, Header } from "./components/layout";
import { Dashboard, Notfound, Product, ProductCreate, ProductDetails } from "./pages";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/create" element={<ProductCreate />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
