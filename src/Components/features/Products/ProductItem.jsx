
import styles from "../Products/Products.module.css";
import { Link } from "react-router-dom";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";

import Button from "../../ui/Button/Button";

export default function ProductItem({
    product,
    handleAddToWish,
    handleRemoveFromWish,
    handleAddToCart,
    wishList
}) {

    const inWishlist = wishList?.data?.data.find((el) => el._id === product._id) ? true : false;
    return (
        <div>
            <div style={{ height: "350px" }} className="col">
                <Link
                    to={`/products/${product._id}`}
                    className={` ${styles.productCard} card overflow-hidden border-0 h-100 text-decoration-none`}
                >
                    <img
                        style={{ scale: "1.1" }}
                        src={product.images[0]}
                        className="card-img-top h-50 "
                        alt={product.id}
                    />
                    <div className={`${styles.cardBody} card-body`}>
                        <div className="h-50">
                            <small className="card-title m-0 text-main  fw-bolder">
                                {product.subcategory[0].name}
                            </small>
                            <h4
                                style={{ fontSize: "0.9rem" }}
                                className="card-text mb-2 h6 fw-bolder"
                            >
                                {product.title.split(" ").length > 2
                                    ? `${product.title.split(" ").slice(0, 4).join(" ")}  .....`
                                    : product.title}{" "}
                            </h4>
                        </div>
                        <div className="d-flex justify-content-between align-items-center ">
                            <span className="fw-bold">{product.price}EGP</span>
                            <span className="fw-bold " style={{ fontSize: "0.9rem" }}>
                                <AiFillStar className="rating-color" />

                                {product.ratingsAverage}
                            </span>

                            <div onClick={(e) => (inWishlist ? handleRemoveFromWish(e, product._id) : handleAddToWish(e, product._id))}>
                                <button className="btn">{inWishlist ? <AiFillHeart /> : <AiOutlineHeart />}</button>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.addBtn} text-center my-2 w-100`}>
                        <Button clickHandler={(e) => handleAddToCart(e, product._id)}>
                            Add To Cart
                        </Button>
                    </div>
                </Link>
            </div>
        </div>
    );
}
