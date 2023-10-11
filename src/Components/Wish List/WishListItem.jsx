import React, { useContext } from 'react'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { WishListContext } from '../../context/WishListContext';
export default function WishListItem({ product }) {
    const { removeFromWishList } = useContext(WishListContext);
    function handleRemove(e) {
        e.preventDefault();
        removeFromWishList(product._id);
    }
    return (
        <>
            <div className="col" key={product._id}>
                <div className="d-flex flex-wrap flex-sm-nowrap gap-3">
                    <div style={{ minWidth: "150px", overflow: "hidden" }}>
                        <img
                            style={{ maxWidth: "150px", scale: "1.1" }}
                            src={product.imageCover}
                            alt={product.title}
                        />
                    </div>
                    <div>
                        <h4 className="fw-bolder">{product.title}</h4>
                        <p className="fw-semibold">{product.description}</p>
                    </div>
                </div>
            </div>
            <div className="col d-flex justify-content-end">
                <button
                    onClick={(e) => handleRemove(e, product._id)}
                    className="btn btn-outline-danger d-flex align-items-center gap-1"
                >
                    {" "}
                    <BsFillTrash3Fill />
                    Remove
                </button>
            </div>
        </>
    )
}