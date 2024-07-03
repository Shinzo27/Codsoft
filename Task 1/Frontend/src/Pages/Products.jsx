import React from 'react'
import ProductCard from '../Components/ProductCard'
import driedFruit1 from '../assets/driedfruit1.jpg'
import driedFruit2 from '../assets/driedfruit2.jpg'
import driedFruit3 from '../assets/driedfruit3.jpg'
import driedFruit4 from '../assets/driedfruit4.jpg'
import Navbar from '../Components/Header'
import Footer from '../Components/Footer'

const productArray = [
  {
    img: driedFruit1,
    name: "Dried Strawberry",
    price: "₹650"
  },
  {
    img: driedFruit2,
    name: "Dried Kiwi",
    price: "₹750"
  },
  {
    img: driedFruit3,
    name: "Dried Orange",
    price: "₹950"
  },
  {
    img: driedFruit4,
    name: "Dried Pomelo Green",
    price: "₹850"
  },
  {
    img: driedFruit4,
    name: "Dried Pomelo Green",
    price: "₹850"
  },
  {
    img: driedFruit4,
    name: "Dried Pomelo Green",
    price: "₹850"
  },
  {
    img: driedFruit4,
    name: "Dried Pomelo Green",
    price: "₹850"
  }
]

const Product = () => {
  return (
    <>
      <Navbar/>
      <div className='container pt-5'>
        <div className=' w-full h-16 bg-blue-500 flex items-center justify-center text-white rounded-xl'>
          <h1 className='text-3xl'>Category Name</h1>
        </div>
        <div className=' p-5 flex justify-center items-center gap-5 flex-wrap'>
          {
            productArray.map((product)=>(
              <div>
                <ProductCard img={product.img} ProductName={product.name} ProductPrice={product.price}/>
              </div>
            ))
          }
        </div>
      </div>
      <div className='container pt-5'>
        <div className=' w-full h-16 bg-blue-500 flex items-center justify-center text-white rounded-xl'>
          <h1 className='text-3xl'>Category Name</h1>
        </div>
        <div className=' p-5 flex justify-center items-center gap-5 flex-wrap'>
          {
            productArray.map((product)=>(
              <div>
                <ProductCard img={product.img} ProductName={product.name} ProductPrice={product.price}/>
              </div>
            ))
          }
        </div>
      </div>
      <div className='container pt-5'>
        <div className=' w-full h-16 bg-blue-500 flex items-center justify-center text-white rounded-xl'>
          <h1 className='text-3xl'>Category Name</h1>
        </div>
        <div className=' p-5 flex justify-center items-center gap-5 flex-wrap'>
          {
            productArray.map((product)=>(
              <div>
                <ProductCard img={product.img} ProductName={product.name} ProductPrice={product.price}/>
              </div>
            ))
          }
        </div>
      </div>
      <div className='container pt-5'>
        <div className=' w-full h-16 bg-blue-500 flex items-center justify-center text-white rounded-xl'>
          <h1 className='text-3xl'>Category Name</h1>
        </div>
        <div className=' p-5 flex justify-center items-center gap-5 flex-wrap'>
          {
            productArray.map((product)=>(
              <div>
                <ProductCard img={product.img} ProductName={product.name} ProductPrice={product.price}/>
              </div>
            ))
          }
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Product