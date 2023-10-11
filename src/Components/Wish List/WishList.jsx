import React, { useContext, useEffect } from "react";
import { WishListContext } from "../../context/WishListContext";
import WishListItem from "./WishListItem";
import Spinner from "../ui/Spinner/Spinner"
export default function WishList() {
    const { wishList, loading, getUserWishList } = useContext(WishListContext);
    useEffect(() => {
        (async () => {
            await getUserWishList();
        })();
    }, [getUserWishList]);
    return (
        <section className="bg-main-light py-3 px-4">
            {loading && <Spinner/>}
            <h2 className="fw-bolder">WishList</h2>
            <div className="row  row-cols-1 row-cols-md-2 py-3 align-items-center g-3 m-0  "
            >
                {wishList?.data?.data?.map((product) =>
                    <WishListItem product={product} key={product._id} />
                )}
            </div>
        </section>
    );
}
