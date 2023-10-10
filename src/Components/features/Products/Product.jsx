import axios from "axios";
import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Button from "../../ui/Button/Button";
import { AiFillStar } from "react-icons/ai";
import { SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CartContext } from "../../../context/CartContext";
import toast from "react-hot-toast";

export default function Product() {
    const { addToCart } = useContext(CartContext)
    async function handleAddToCart(e, productId) {
        e.preventDefault();
       await addToCart(productId);
        toast.success("Product Added To Cart", {
            style: {
                boxShadow: "0 0 0 1px  var(--main-color)",
                fontWeight: "bolder",
                color: "var(--main-color)",
            },
        });
    }
    const product = useLoaderData();
    return (
        <div className="row">
            <div className="col-12 col-md-4 ">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                    {product.images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <div>
                                <img className="img-fluid " src={img} alt={product.title} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="col-12 col-md-8  d-flex flex-column justify-content-center">
                <h5 className="fw-bolder">{product.title}</h5>
                <p className="text-gray fw-semibold p-2" style={{ fontSize: "0.9rem" }}>
                    {product.description}
                </p>
                <span className="text-main fw-bolder">{product.category.name}</span>
                <div className="d-flex justify-content-between fw-bolder my-2">
                    <span>{product.price} EGP</span>
                    <span>
                        <AiFillStar className="rating-color" /> {product.ratingsAverage}
                    </span>
                </div>
                <Button type="submit" clickHandler={(e) => handleAddToCart(e, product._id)}>Add To Cart</Button>
            </div>
        </div>
    );
}
export async function loader({ params }) {
    const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${params.productId}`
    );
    if (res.statusText === "OK") return res.data.data;
}
