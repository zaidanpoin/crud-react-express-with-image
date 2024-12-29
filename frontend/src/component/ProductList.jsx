
import React, { Suspense, lazy } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const ProductList = () => {
  const [products, setProducts] = useState([])


  useEffect(() => {
    getProduct()
  }, [])


  const deleteByid = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:3000/product/${id}`);
      getProduct(); // Refresh the product list after deletion
    }
  };



  const getProduct = async () => {
    const response = await axios.get(`http://localhost:3000/products`)
    setProducts(response.data)
  }

  return (


    <div className=" mt-12 w-4/6 mx-auto my-5">


      <Link to={'/add-product'} className='btn bg-green-500 text-white p-2 mb-2 rounded'>Add new</Link>



      <div className="grid  sm:grid-cols-4 gap-4">

        {products.map((product) => (
          <div key={product.id} className="h-auto w-5/6 p-4   shadow-2xl rounded ">
            <div className=" ">
              <img src={product.url} alt="lia" className='h-full w-full' />

            </div>

            <div className="text-center">
              <h1 className="text-lg font-bold">{product.name}</h1>

            </div>
            <div className="flex border-2 border-gray-600">
              <Link to={`edit-product/${product.id}`} className="btn bg-green-400 w-[50%] text-white text-center">edit</Link>
              <button
                className="btn bg-red-400 w-[50%] text-white text-center"
                onClick={() => deleteByid(product.id)} // Call deleteByid with the product id
              >
                Delete
              </button>
            </div>
          </div>


        ))}




      </div>
    </div >

  )
}

export default ProductList
