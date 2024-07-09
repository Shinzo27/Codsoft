import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import driedFruit1 from "../assets/driedfruit1.jpg";
import driedFruit2 from "../assets/driedfruit2.jpg";
import driedFruit3 from "../assets/driedfruit3.jpg";
import driedFruit4 from "../assets/driedfruit4.jpg";
import Navbar from "../Components/Header";
import Footer from "../Components/Footer";

const productArray = [
  {
    img: driedFruit1,
    name: "Dried Strawberry",
    price: "₹650",
  },
  {
    img: driedFruit2,
    name: "Dried Kiwi",
    price: "₹750",
  },
  {
    img: driedFruit3,
    name: "Dried Orange",
    price: "₹950",
  },
  {
    img: driedFruit4,
    name: "Dried Pomelo Green",
    price: "₹850",
  },
  {
    img: driedFruit4,
    name: "Dried Pomelo Green",
    price: "₹850",
  },
  {
    img: driedFruit4,
    name: "Dried Pomelo Green",
    price: "₹850",
  },
  {
    img: driedFruit4,
    name: "Dried Pomelo Green",
    price: "₹850",
  },
];

const Product = () => {
  const [product, setProduct] = useState([]);
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);

  async function getProduts() {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/product/categoryProduct`,
      { withCredentials: true }
    );
    console.log(data.productsByCategory);
    setCategoriesWithProducts(data.productsByCategory);
  }
  useEffect(() => {
    getProduts();
  }, []);

  return (
    <>
      <div className="container pt-5">
        {categoriesWithProducts.map((category) => (
          <div key={category._id}>
            <div className=" w-full h-16 bg-blue-500 flex items-center justify-center text-white rounded-xl">
              <h1 className="text-3xl">{category.categoryName}</h1>
            </div>
            <div className=" p-5 flex justify-center items-center gap-5 flex-wrap">
                {category.products.map((product) => (
                  <ProductCard
                    img={product.imgUrl}
                    ProductName={product.name}
                    ProductPrice={product.price}
                    id={product._id}
                    key={product._id}
                  />
                ))}
            </div>
          </div>  
        ))}
      </div>
    </>
  );
};

export default Product;
