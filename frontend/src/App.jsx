import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from "./component/ProductList";
import AddProduct from './component/AddProduct';
import EditProduct from './component/EditProduct';
import React, { Suspense, lazy } from 'react';





function App() {
  return (

    <>

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<ProductList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path='edit-product/:id' element={<EditProduct />} />
        </Routes>


      </BrowserRouter>
    </>
  );
}

export default App;