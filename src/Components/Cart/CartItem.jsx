import React, { useContext } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import styles from "./Cart.module.css";
import { CartContext } from "../../context/CartContext";
export default function CartItem({ cartItem }) {
    const {removeFromCart ,changeQuantity } = useContext(CartContext)
    return (
        <>
        <div className="row row-cols-1 py-3  m-0 row-cols-md-2 border rounded-3 border-5 ">
            <div className=" col text-center text-md-start">
                <div className="d-flex flex-wrap flex-sm-nowrap gap-3">
                    <div style={{ width: "150px" }}>
                        <img style={{ maxWidth: "150px" }} className="img-fluid " src={cartItem.product.imageCover} alt={cartItem.title} />
                    </div>
                    <div className="w-100 d-flex flex-column justify-content-center">
                        <h4 className="fw-bolder">{cartItem.product.title}</h4>
                        <span>Price :<span className="text-main fw-bolder"> {cartItem.price} EGP</span> </span>
                        <div>
                            <button onClick={()=>removeFromCart(cartItem.product._id)} className="btn btn-outline-danger my-3">
                                <BsFillTrash3Fill /> Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" col d-flex align-items-center justify-content-center justify-content-md-end gap-2">
                <div className="d-flex gap-2 align-items-center">
                    <button onClick={()=>changeQuantity(cartItem.product._id , cartItem.count+1)} className={`${styles.btn} btn `}>
                        <CgMathPlus className="fs-6" />
                    </button>
                    <span>{cartItem.count}</span>
                    <button onClick={()=>{
                        if(cartItem.count ===1){
                            removeFromCart(cartItem.product._id)
                            return
                        }else{
                            changeQuantity(cartItem.product._id , cartItem.count-1)
                        }
                    }} className={`${styles.btn} btn `}>
                        <CgMathMinus className="fs-6" />
                    </button>
                </div>
            </div>
        </div>
            
        </>
    );
}
