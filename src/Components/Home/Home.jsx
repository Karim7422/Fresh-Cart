import React, { useContext, useEffect, useState } from "react";
import styles from "../Home/Home.module.css";
import MainSlider from "../ui/Slider/MainSlider";
import blog_img1 from "../../Assets/images/blog1.png";
import blog_img2 from "../../Assets/images/blog2.jpg";
import CategorySlider from "../ui/Slider/CategorySlider";
import ProductsList from "../features/Products/ProductsList";
import { ProductsContext } from "../../context/ProductsContext";
import axios from "axios";
import Spinner from "../ui/Spinner/Spinner";
export default function Home() {
  const { products, setProducts } = useContext(ProductsContext);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        setProducts(res.data.data);
      } catch (err) {
        setErr(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (products.length > 0) return;
    getProducts();
  }, [setProducts, products.length, setLoading]);
  const [imgs, setImgs] = useState(true);
  useEffect(() => {
    if (window.innerWidth < 992) {
      setImgs(false);
    }
  }, []);
  return (
    <>
      <section className={`${styles.mainSlider}   container-fluid d-flex `}>
        <MainSlider />
        {imgs && (
          <div className="images">
            <div style={{ width: "300px", height: "300px" }}>
              <img
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                src={blog_img1}
                alt="blog img1"
              />
            </div>
            <div style={{ width: "300px", height: "260px" }}>
              <img
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                src={blog_img2}
                alt="blog img2"
              />
            </div>
          </div>
        )}
      </section>
      <section className={`${styles.categorySlider} mt-4 container-fluid`}>
        <CategorySlider />
      </section>
      <section className="mt-4 position-relative">
        {err && <p className="text-danger text-center fw-bolder">{err}</p>}
        {loading && <Spinner />}
        <ProductsList products={products} />
      </section>
    </>
  );
}
export async function loader() {
  const res = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products`
  );
  const {
    data: { data },
  } = res;
  return data;
}
