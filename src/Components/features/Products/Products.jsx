import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../../context/ProductsContext";
import axios from "axios";
import ProductsList from "./ProductsList";
import Spinner from "../../ui/Spinner/Spinner";


export default function Products() {
  const { products, setProducts } = useContext(ProductsContext);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [searchProduct, setSearchProduct] = useState(products);

  function handleChange(e) {
    const data = products.filter((el) =>
      el.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchProduct(data);
  }
  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        setProducts(res.data.data);
        setSearchProduct(res.data.data);
      } catch (err) {
        setErr(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (products.length > 0) return;
    
    getProducts();
  }, [setProducts, products.length]);
  return (
    <div>
      <form className="mt-5 d-flex justify-content-center">
        <div className="form-group ">
          <label className="visually-hidden">search products</label>
          <input
            className="form-control border-light-subtle border-2 rounded-4  fw-bolder "
            type="search"
            placeholder="Search For Products"
            onChange={handleChange}
          />
        </div>
      </form>
      <section className="mt-5">
        <ProductsList products={searchProduct} />
        {err && <p className="text-danger text-center fw-bolder">{err}</p>}
        {loading && <Spinner />}
      </section>
    </div>
  );
}
