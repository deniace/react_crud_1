// import React, {useState, useEffect} from 'react';
// import axios from 'axios';
// import Navbar from './component/navbar';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProductList from './component/ProductList';
import AddProduct from './component/AddProduct';
import EditProduct from './component/EditProduct';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add_product" element={<AddProduct />} />
        <Route path="/edit_product/:id" element={<EditProduct />} />
      </Routes>
      {/* <ProductList /> */}
      {/* <h1>Lorem ipsum dolor sit amet.</h1> */}
      {/* <Navbar /> */}
      {/* <div>asdf</div> */}
    </BrowserRouter>
  )
}

export default App