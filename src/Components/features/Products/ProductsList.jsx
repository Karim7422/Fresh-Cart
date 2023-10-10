import React, { useContext, useEffect } from "react";
import ProductsItem from "../Products/ProductItem"
import { CartContext } from "../../../context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../../context/WishListContext";
export default function ProductsList({ products }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishList,getUserWishList ,wishList,removeFromWishList} = useContext(WishListContext);

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

  function handleAddToWish(e, productId) {
    e.preventDefault();
   addToWishList(productId);
    toast.success("Product Added To WishList", {
      style: {
        boxShadow: "0 0 0 1px  var(--main-color)",
        fontWeight: "bolder",
        color: "var(--main-color)",
      },
    });
  }
   function handleRemoveFromWish(e, productId) {
    e.preventDefault();
   removeFromWishList(productId);
    toast.success("Product Removed From WishList", {
      style: {
        boxShadow: "0 0 0 1px  var(--main-color)",
        fontWeight: "bolder",
        color: "var(--main-color)",
      },
    });
  }
  useEffect(()=>{
    getUserWishList()
  },[getUserWishList])


  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6  gy-5">
      {products?.map((product) => (
        <ProductsItem
          product={product}
          handleAddToWish={handleAddToWish}
          handleRemoveFromWish={handleRemoveFromWish}
          handleAddToCart={handleAddToCart}
          wishList={wishList}
          key={product.id}
        />
      ))}
    </div>
  );
}